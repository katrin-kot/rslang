import { errorWindow } from '../components/main/errorWindow/errorWindow';
import { getAllUserWords } from './userWordService';
import { getUserID } from './authService';
import { getToken } from './token';

export const checkUserLogin = async () => {
  const userId = getUserID();
  const token = getToken();

  if (!userId || !token) {
    errorWindow();
    return;
  }
  try {
    await getAllUserWords({ userId });
  } catch (error) {
    errorWindow();
  }
};

export const checkUserLoginWithoutWindow = async () => {
  const userId = getUserID();
  const token = getToken();
  let result = true;

  if (!userId || !token) {
    result = false;
  }
  try {
    await getAllUserWords({ userId });
  } catch (error) {
    result = false;
  }

  return result;
};
