import { getToken } from './token';


export const getStatistics = async ({ userId }) => {
  const token = getToken();
  const rawResponse = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`,
    {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  return rawResponse.json();
};

export const addEmptyStatistics = ({ userId }) => {
  const token = getToken();
  return fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`,
    {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        optional: {},
      }),
    });
};
export const putStatistics = ({ userId, payload }) => {
  const token = getToken();
  return fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`,
    {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
};
