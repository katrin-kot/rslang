import { errorWindow } from '../components/main/errorWindow/errorWindow';
import { getUserID } from './authService';
import { getToken } from './token';
import { getSettings, getUserSettings } from './settingsService';

export const checkUserLogin = async () => {
  const userId = getUserID();
  const token = getToken();
  const settings = getSettings();

  if (!userId || !token || !settings) {
    errorWindow();
    return;
  }
  try {
    await getUserSettings({ userId });
  } catch (error) {
    errorWindow();
  }
};

export const checkUserLoginWithoutWindow = async () => {
  const userId = getUserID();
  const token = getToken();
  const settings = getSettings();
  let result = true;

  if (!userId || !token || !settings) {
    result = false;
  }
  try {
    await getUserSettings({ userId });
  } catch (error) {
    result = false;
  }

  return result;
};
