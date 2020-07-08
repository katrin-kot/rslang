import { getUserID } from './authService';
import { createUserWord, updateUserWord } from './userWordService';
import { getTodayDate } from '../pages/SRgame/helpers';
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
  const response = await getAllUserAggregatedWords(filterForNewWords, 5);
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

export const updateWordWithError = async ({ wordId }) => {
  updateUserWord({
    userId: getUserID(),
    wordId,
    word: { optional: { dateToShow: `${getTodayDate()}` } },
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
