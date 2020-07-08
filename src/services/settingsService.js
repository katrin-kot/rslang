import { getToken } from './token';

export const getUserSettings = async ({ userId }) => {
  const rawResponse = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`,
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

export const putUserSettings = async ({ userId, wordsPerDay, optional }) => {
  const rawResponse = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`,
    {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ wordsPerDay, optional }),
    },
  );
  const content = await rawResponse.json();
  return content;
};

export function putDefaultSettings(userId) {
  const optional = {
    newWordsPerDay: 50,
    showDelete: true,
    showAnswer: false,
    moveinHard: true,
    showDifficulty: true,
    wordTranslate: true,
    transcription: false,
    image: false,
    textExample: true,
    textExampleTranslate: false,
    textMeaningTranslate: false,
    textMeaning: false,
    audio: false,
    audioExample: true,
    audioMeaning: false,
  };
  return putUserSettings({ userId, wordsPerDay: 50, optional });
}
