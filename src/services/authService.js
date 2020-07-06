import {addEmptyStatistics} from "./statsService";

export const loginUser = async (user) => {
  const rawResponse = await fetch(
    'https://afternoon-falls-25894.herokuapp.com/signin',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    },
  );
  const content = await rawResponse.json();
  localStorage.setItem('token', content.token);
  localStorage.setItem('userID', content.userId);
  return content;
};

export const createUser = async (user) => {
  const rawResponse = await fetch(
    'https://afternoon-falls-25894.herokuapp.com/users',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    },
  );
  const content = await rawResponse.json();
  await loginUser(user);
  addEmptyStatistics({userId: content.id})
  localStorage.setItem('email', content.email);
  return content;
};

export function getToken() {
  return localStorage.getItem('token');
}

export const getNewUserToken = async ({ userId }) => {
  const rawResponse = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/users/${userId}/tokens`,
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


export function getUserID() {
  return localStorage.getItem('userID');
}

export function getUserEmail() {
  return localStorage.getItem('email');
}

export function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('userID');
}
