import { getToken } from '../../../services/token';
import { getUserID } from '../../../services/authService';
import { getUserWord } from '../../../services/userWordService';
import { createWordWithError, updateWordWithError } from '../../../services/SRgameWordsService';

function randomNumHelper(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function randomUserWords(arr, wordsPerPage) {
  const rNum = randomNumHelper(0, arr.length - wordsPerPage);
  return arr.slice(rNum, rNum + wordsPerPage);
}

const getUserAggregatedWord = async ({
  userId,
  group,
  wordsPerPage,
  filter,
}) => {
  let url = '';

  if (group === undefined) {
    url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords?wordsPerPage=${wordsPerPage}&${filter}`;
  } else {
    url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords?group=${group}&wordsPerPage=${wordsPerPage}&${filter}`;
  }

  const rawResponse = await fetch(
    `${url}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
      },
    },
  );
  const content = await rawResponse.json();
  return content;
};

async function getWordforGame(group, page, wordsPerPage) {
  const filter = new window.URLSearchParams({
    filter: `{"$and":[{"page": ${page}}]}`,
  }).toString();
  const wordsForGame = await getUserAggregatedWord({
    userId: getUserID(),
    group,
    wordsPerPage: 20,
    filter,
  });
  return randomUserWords(wordsForGame[0].paginatedResults, wordsPerPage);
}

async function getStudyWordforGame(wordsPerPage) {
  const filter = new window.URLSearchParams({
    filter: '{"$and":[{"userWord.optional.status":"to_study"}]}',
  }).toString();
  const getAllUsersWords = await getUserAggregatedWord({
    userId: getUserID(),
    group: undefined,
    wordsPerPage: 3600,
    filter,
  });
  const arr = getAllUsersWords[0].paginatedResults;

  if (arr.length >= wordsPerPage) {
    return randomUserWords(arr, wordsPerPage);
  }
  return undefined;
}

class Words {
  constructor() {
    this.currentWords = [];
  }

  async getWords(group, page, wordsPerPage) {
    const data = await getWordforGame(group, page, wordsPerPage);
    return data;
  }

  async getStudyWords(wordsPerPage) {
    const data = await getStudyWordforGame(wordsPerPage);
    return data;
  }

  getCurrentWords() {
    return this.currentWords;
  }

  removeCurrentWords() {
    this.currentWords = [];
  }

  setCurrentWords(words) {
    this.currentWords = [...words];
  }

  addWrongAnswersToAnki(wordsId) {
    wordsId.forEach(async (id) => {
      try {
        await getUserWord({
          userId: getUserID(),
          wordId: id,
        });
        updateWordWithError({
          wordId: id,
        });
      } catch (err) {
        createWordWithError({
          wordId: id,
        });
      }
    });
  }
}

export default new Words();
