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
  localStorage.setItem('email', content.email);
  return content;
};

export function getToken() {
  return localStorage.getItem('token');
}

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
