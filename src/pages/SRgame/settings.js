export const settings = JSON.parse(localStorage.getItem('settings'));
export const wordSetting = true;
export const imageSetting = JSON.parse(localStorage.getItem('settings')).optional.image;
export const audioSetting = JSON.parse(localStorage.getItem('settings')).optional.audio;
export const audioMeaningSetting = JSON.parse(localStorage.getItem('settings')).optional.audioMeaning;
export const audioExampleSetting = JSON.parse(localStorage.getItem('settings')).optional.audioExample;
export const textMeaningSetting = JSON.parse(localStorage.getItem('settings')).optional.textMeaning;
export const textExampleSetting = JSON.parse(localStorage.getItem('settings')).optional.textExample;
export const transcriptionSetting = JSON.parse(localStorage.getItem('settings')).optional.transcription;
export const textExampleTranslateSetting = JSON.parse(localStorage.getItem('settings')).optional.textExampleTranslate;
export const textMeaningTranslateSetting = JSON.parse(localStorage.getItem('settings')).optional.textMeaningTranslate;
export const wordTranslateSetting = JSON.parse(localStorage.getItem('settings')).optional.wordTranslate;

export const showAnswerBtnSetting = JSON.parse(localStorage.getItem('settings')).optional.showAnswer;
export const addToHardBtnSetting = JSON.parse(localStorage.getItem('settings')).optional.moveinHard;
export const deleteWordBtnSetting = JSON.parse(localStorage.getItem('settings')).optional.showDelete;

export const difficultyBtnsSetting = JSON.parse(localStorage.getItem('settings')).optional.showDifficulty;
export const { isShowAllLearningWords } = JSON.parse(localStorage.getItem('settings')).optional;

export const { wordsPerDay } = JSON.parse(localStorage.getItem('settings'));
export const { newWordsPerDay } = JSON.parse(localStorage.getItem('settings')).optional;

export const learningWordsPerDay = wordsPerDay - newWordsPerDay;
