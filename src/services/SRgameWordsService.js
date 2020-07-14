import { getUserID } from './authService';
import { createUserWord, updateUserWord, getAllHardWords } from './userWordService';
import { getTodayDate } from '../pages/SRgame/helpers';
import { newWordsPerDay, learningWordsPerDay, isShowAllLearningWords } from '../pages/SRgame/settings';
import { getToken } from './token';
import { getStatistics, putStatistics } from './statsService';

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
  const studiedWords = await getTodayNewWordsCount();
  if (studiedWords >= newWordsPerDay) {
    return [];
  }
  const count = newWordsPerDay - studiedWords;
  const filterForNewWords = '{"userWord":null}';
  const response = await getAllUserAggregatedWords(filterForNewWords, count);
  return response[0].paginatedResults;
};

export const getLearningWords = async () => {
  const filterForLearningWords = '{"userWord":{"$ne":null}}';
  const response = await getAllUserAggregatedWords(filterForLearningWords, 3600);
  console.log(response[0].paginatedResults)
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
  const learnedWords = await getTodayLearnedWordsCount();
  if (isShowAllLearningWords) {
    return wordsCount;
  }
  if (learnedWords >= learningWordsPerDay) {
    return 0;
  }
  if (learnedWords < learningWordsPerDay) {
    const count = learningWordsPerDay - learnedWords;
    if (wordsCount > count) {
      return count;
    }
    if (wordsCount < count) {
      return wordsCount;
    }
  }
  return 0;
};

export const updateStatLearningWords = async (num) => {
  const stat = await getStatistics({ userId: getUserID() });
  if (!stat.optional.SRgame) {
    stat.optional.SRgame = {};
  }
  delete stat.id;
  if (!stat.optional.SRgame[getTodayDate()]) {
    stat.optional.SRgame[getTodayDate()] = { learningWords: 0, newWords: 0 };
  }
  stat.optional.SRgame[getTodayDate()].learningWords = num;
  putStatistics({
    userId: getUserID(),
    payload: stat,
  });
};

export const updateStatNewWords = async (num) => {
  const stat = await getStatistics({ userId: getUserID() });
  if (!stat.optional.SRgame) {
    stat.optional.SRgame = {};
  }
  delete stat.id;
  if (!stat.optional.SRgame[getTodayDate()]) {
    stat.optional.SRgame[getTodayDate()] = { learningWords: 0, newWords: 0 };
  }
  stat.optional.SRgame[getTodayDate()].newWords += num;
  putStatistics({
    userId: getUserID(),
    payload: stat,
  });
};

export const getTodayLearnedWordsCount = async () => {
  const stat = await getStatistics({ userId: getUserID() });
  if (!stat.optional.SRgame) {
    return 0;
  }
  if (!stat.optional.SRgame[getTodayDate()]) {
    return 0;
  }
  return stat.optional.SRgame[getTodayDate()].learningWords;
};

export const getTodayNewWordsCount = async () => {
  const stat = await getStatistics({ userId: getUserID() });
  if (!stat.optional.SRgame) {
    return 0;
  }
  if (!stat.optional.SRgame[getTodayDate()]) {
    return 0;
  }
  return stat.optional.SRgame[getTodayDate()].newWords;
};
