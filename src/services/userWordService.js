import { getToken } from './authService';
import { getImageUrl, getWordbyId, getAudioUrl } from './wordService';

const token = getToken();

export const getAllUserWords = async ({ userId }) => {
  const rawResponse = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words`,
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
  const resultWithData = await Promise.all(
    content.map(async (elem) => {
      const data = await getWordbyId(elem.wordId);
      data.image = getImageUrl(data.image);
      data.audio = getAudioUrl(data.audio);
      data.audioExample = getAudioUrl(data.audioExample);
      data.audioMeaning = getAudioUrl(data.audioMeaning);
      return { ...elem, data };
    }),
  );
  console.log(
    resultWithData,
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
  console.log(hardWords);
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
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    },
  );
  const content = await rawResponse.json();

  console.log(content);
  return content;
};

export const getUserWord = async ({ userId, wordId }) => {
  const rawResponse = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`,
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

  console.log(content);
  return content;
};
