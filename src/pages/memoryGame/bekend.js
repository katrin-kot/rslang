import { getToken } from '../../services/authService';

const token = getToken();

const getUserAggregatedWord = async ({
  userId,
  group,
  wordsPerPage,
  filter,
}) => {
  const rawResponse = await fetch(
    // `https://pacific-castle-12388.herokuapp.com/users/${userId}/aggregatedWords?group=${group}&wordsPerPage=${wordsPerPage}&${filter}`,
    `https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords?group=${group}&wordsPerPage=${wordsPerPage}&${filter}`,
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

function randomNumHelper(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function randomUserWords(arr, wordsPerPage) {
  const rNum = randomNumHelper(0, arr.length - wordsPerPage);
  const randomWords = arr.slice(rNum, rNum + wordsPerPage);
  // const idxArr = [];
  // while (idxArr.length < arr.length) {
  //   const random = randomNumHelper(0, arr.length - 1);
  //   if (idxArr.indexOf(random) === -1) {
  //     idxArr.push(random);
  //   }
  // }
  // const randomWords = idxArr.map((idx) => arr[idx]).splice(0, wordsPerPage);
  randomWords.forEach((word) => ({ ...word, isLearned: true }));
  console.log(randomWords);
  return randomWords;
}


export async function getWordforGame(userId, group, wordsPerPage, page) {
  let filter = new window.URLSearchParams({
    filter: `{"$and":[{"userWord.optional.status":"to_study", "page": ${page}}]}`,
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
      filter: `{"$and":[{"userWord": null, "page": ${page}}]}`,
    }).toString();
    const allWords = await getUserAggregatedWord({
      userId,
      group,
      wordsPerPage: 20,
      filter,
    });
    const arr = allWords[0].paginatedResults;
    const randomArr = randomUserWords(arr, wordsPage);
    console.log(
      userWords[0].paginatedResults.concat(randomArr),
    );
    return userWords[0].paginatedResults.concat(randomArr);
  }
  const getAllUserWords = await getUserAggregatedWord({
    userId,
    group,
    wordsPerPage: 3600,
    filter,
  });
  const arr = getAllUserWords[0].paginatedResults;

  return randomUserWords(arr, wordsPerPage);
}
