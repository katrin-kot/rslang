import { getToken } from './token';
import { getWordbyId } from './wordService';
import { randomUserWords } from '../helpers/random';

export const getAllUserWords = async ({ userId }) => {
  const rawResponse = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words`,
    {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
      },
    },
  );
  const content = await rawResponse.json();
  const resultWithData = await Promise.all(
    content.map(async (elem) => {
      const data = await getWordbyId(elem.wordId);
      return { ...elem, data };
    }),
  );
  return resultWithData;
};

export async function getAllStudyWords({ userId }) {
  const content = await getAllUserWords({ userId });
  const studyWords = content.filter(
    (elem) => elem.optional.status === 'to_study',
  );
  return studyWords;
}

export async function getAllHardWords({ userId }) {
  const content = await getAllUserWords({ userId });
  const hardWords = content.filter((elem) => elem.optional.status === 'hard');
  return hardWords;
}

export async function getAllDeleteWords({ userId }) {
  const content = await getAllUserWords({ userId });
  const deleteWords = content.filter(
    (elem) => elem.optional.status === 'delete',
  );
  return deleteWords;
}

export const createUserWord = async ({ userId, wordId, word }) => {
  const rawResponse = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`,
    {
      method: 'POST',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    },
  );
  const content = await rawResponse.json();
  return content;
};

export const getUserWord = async ({ userId, wordId }) => {
  const rawResponse = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`,
    {
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

export const updateUserWord = async ({ userId, wordId, word }) => {
  const rawResponse = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`,
    {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    },
  );
  const content = await rawResponse.json();
  return content;
};

const getUserAggregatedWord = async ({
  userId,
  group,
  wordsPerPage,
  filter,
}) => {
  const rawResponse = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords?group=${group}&wordsPerPage=${wordsPerPage}&${filter}`,
    {
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

export async function getWordforGame(userId, group, rawWordsPerPage, page) {
  const wordsPerPage = rawWordsPerPage < 20 ? rawWordsPerPage : 20;
  let filter = new window.URLSearchParams({
    filter: `{ "$and": [{ "userWord.optional.status": "to_study", "page": ${page}}] }`,
  }).toString();
  const userWords = await getUserAggregatedWord({
    userId,
    group,
    wordsPerPage,
    filter,
  });
  if (userWords[0].paginatedResults.length < wordsPerPage) {
    const wordsPage = wordsPerPage - userWords[0].paginatedResults.length;
    filter = new window.URLSearchParams({
      filter: `{ "$and": [{"userWord": null, "page": ${page} }] }`,
    }).toString();
    const allWords = await getUserAggregatedWord({
      userId,
      group,
      wordsPerPage: 20,
      filter,
    });
    const arr = allWords[0].paginatedResults;
    const randomArr = randomUserWords(arr, wordsPage);
    return userWords[0].paginatedResults.concat(randomArr);
  }
  const getAllUsersWords = await getUserAggregatedWord({
    userId,
    group,
    wordsPerPage: 20,
    filter,
  });
  const arr = getAllUsersWords[0].paginatedResults;

  return randomUserWords(arr, wordsPerPage);
}
