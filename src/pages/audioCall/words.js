import { getToken } from '../../services/token';
import { getUserID } from '../../services/authService';

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

export async function getWordforGame(group, page, wordsPerPage) {
  const filter = new window.URLSearchParams({
    filter: `{"$and":[{"page": ${page}}]}`,
  }).toString();
  const wordsForGame = await getUserAggregatedWord({
    userId: getUserID(),
    group,
    wordsPerPage: 20,
    filter,
  });
  return randomUserWords(wordsForGame[0].paginatedResults, parseInt(wordsPerPage, 10));
}
