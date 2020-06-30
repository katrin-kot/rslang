import { errorWindow } from '../components/main/errorWindow/errorWindow';
import { getAllUserWords } from './userWordService';
import { getUserID, getToken } from './authService';

export const checkUserLogin = () => {
  const userId = getUserID();
  const token = getToken();

  if (userId && token && getAllUserWords({ userId })) {
  } else {
    errorWindow();
  }
};
