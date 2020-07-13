import { renderCheckbox } from './renderCheckbox';

const cardsSettings = [
  { name: 'wordTranslate', textContent: 'Перевод слова' },
  { name: 'transcription', textContent: 'Транскрипция слова' },
  { name: 'image', textContent: 'Картинка-ассоциация' },
  {
    name: 'textExample',
    textContent: 'Пример использования на английском языке',
  },
  {
    name: 'textExampleTranslate',
    textContent: 'Пример использования на русском языке',
  },
  {
    name: 'textMeaningTranslate',
    textContent: 'Значение слова на русском языке',
  },
  {
    name: 'textMeaning',
    textContent: 'Значение слова на английском языке',
  },
  {
    name: 'audio',
    textContent: ' Произношение слова',
  },
  {
    name: 'audioExample',
    textContent: 'Произношение примера использования',
  },
  {
    name: 'audioMeaning',
    textContent: 'Произношение значения слова',
  },
];

export function renderCardsSettings(userSettings) {
  const fragment = document.createDocumentFragment();

  cardsSettings.forEach((elem) => {
    renderCheckbox(elem, fragment, userSettings);
  });
  return fragment;
}
