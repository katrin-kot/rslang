import { checkUserLogin } from '../../services/verifyUserService';

const setSettings = () => {
  checkUserLogin();
  return JSON.parse(localStorage.getItem('settings'));
};


export const settings = setSettings();
export const wordSetting = true;
export const imageSetting = settings.optional.image;
export const audioSetting = settings.optional.audio;
export const audioMeaningSetting = settings.optional.audioMeaning;
export const audioExampleSetting = settings.optional.audioExample;
export const textMeaningSetting = settings.optional.textMeaning;
export const textExampleSetting = settings.optional.textExample;
export const transcriptionSetting = settings.optional.transcription;
export const textExampleTranslateSetting = settings.optional.textExampleTranslate;
export const textMeaningTranslateSetting = settings.optional.textMeaningTranslate;
export const wordTranslateSetting = settings.optional.wordTranslate;

export const showAnswerBtnSetting = settings.optional.showAnswer;
export const addToHardBtnSetting = settings.optional.moveinHard;
export const deleteWordBtnSetting = settings.optional.showDelete;

export const difficultyBtnsSetting = settings.optional.showDifficulty;
export const { isShowAllLearningWords } = settings.optional;

export const { wordsPerDay } = settings;
export const { newWordsPerDay } = settings.optional;

export const learningWordsPerDay = wordsPerDay - newWordsPerDay;
