import { errorWindow } from '../components/main/errorWindow/errorWindow';
import { getAllUserWords } from './userWordService';
import { getUserID, getToken } from './authService';

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
