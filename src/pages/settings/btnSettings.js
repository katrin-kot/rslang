import { renderCheckbox } from './renderCheckbox';

const btnSettings = [
  { name: 'showDelete', textContent: 'Удалить слово' },
  { name: 'showAnswer', textContent: 'Показать ответ' },
  { name: 'moveinHard', textContent: 'Переместить в сложные' },
  {
    name: 'showDifficulty',
    textContent: '"Снова", "Трудно", "Хорошо", "Легко"',
  },
];

export function renderBtnSettings(userSettings) {
  const fragment = document.createDocumentFragment();

  btnSettings.forEach((elem) => {
    renderCheckbox(elem, fragment, userSettings);
  });
  return fragment;
}
