import { getUserID } from './authService';
import { createUserWord, updateUserWord, getAllHardWords } from './userWordService';
import { getTodayDate } from '../pages/SRgame/helpers';
import { newWordsPerDay, learningWordsPerDay, isShowAllLearningWords } from '../pages/SRgame/settings';
import { getToken } from './token';


const userID = getUserID();

const getAllUserAggregatedWords = async (filter, wordsPerPage) => {
  const token = getToken();
  const rawResponse = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/users/${userID}/aggregatedWords?wordsPerPage=${wordsPerPage}&filter=${filter}`,
    {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    },
  );
  const content = await rawResponse.json();
  return content;
};


export const getNewWords = async () => {
  const filterForNewWords = '{"userWord":null}';
  const response = await getAllUserAggregatedWords(filterForNewWords, newWordsPerDay);
  return response[0].paginatedResults;
};

export const getLearningWords = async () => {
  const filterForLearningWords = '{"userWord":{"$ne":null}}';
  const response = await getAllUserAggregatedWords(filterForLearningWords, 3600);
  return response[0].paginatedResults;
};

export const filterLearningWordsPerDate = async () => {
  const filteredWords = [];
  const today = new Date();
  const allWords = await getLearningWords();
  allWords.forEach((word) => {
    const dateToShow = new Date(word.userWord.optional.dateToShow);
    const { status } = word.userWord.optional;
    if (today > dateToShow && status === 'to_study') {
      filteredWords.push(word);
    }
  });
  return filteredWords;
};

export const getUserAggregatedWord = async ({ wordId }) => {
  const token = getToken();
  const rawResponse = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/users/${userID}/aggregatedWords/${wordId}`,
    {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    },
  );
  const content = await rawResponse.json();
  return content;
};

export const updateWordWithError = async ({ wordId }) => {
  const content = await getUserAggregatedWord({ wordId });
  const settings = content[0].userWord;
  settings.optional.dateToShow = `${getTodayDate()}`;
  updateUserWord({
    userId: getUserID(),
    wordId,
    word: settings,
  });
};

export const createWordWithError = async ({ wordId }) => {
  const settings = {
    difficulty: 'normal',
    optional: {
      status: 'to_study', count: '0', learningGroup: '1', date: 0, dateToShow: `${getTodayDate()}`,
    },
  };

  createUserWord({
    userId: getUserID(),
    wordId,
    word: settings,
  });
};

export const getHardWords = async () => {
  const filteredWords = [];
  const allWords = await getLearningWords();
  allWords.forEach((word) => {
    const { status } = word.userWord.optional;
    if (status === 'hard') {
      filteredWords.push(word);
    }
  });
  return filteredWords;
};

export const getHardWordsCount = async () => {
  const words = await getAllHardWords({
    userId: getUserID(),
  });
  return words.length;
};

export const getLearningWordsCount = async () => {
  const words = await filterLearningWordsPerDate();
  const wordsCount = words.length;
  if (isShowAllLearningWords) {
    return wordsCount;
  }
  if (wordsCount > learningWordsPerDay) {
    return learningWordsPerDay;
  }
  if (wordsCount < learningWordsPerDay) {
    return wordsCount;
  }
  return 0;
};
