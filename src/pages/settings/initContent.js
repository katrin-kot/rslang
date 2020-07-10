import { getUserID } from '../../services/authService';
import {
  getUserSettings,
} from '../../services/settingsService';
import { renderBtnSettings } from './btnSettings';
import { renderCardsSettings } from './cardsSettings';
import { renderCheckbox } from './renderCheckbox';

export async function initContent() {
  const userId = getUserID();
  const btnBlock = document.querySelector('.btn-settings');
  const wordBlock = document.querySelector('.word-settings');
  const cardBlock = document.querySelector('.cards-settings');
  const userSettings = await getUserSettings({ userId });
  document.querySelectorAll('.form-control').forEach((elem, idx) => {
    if (idx === 0) {
      elem.value = userSettings.wordsPerDay;
    } else {
      elem.value = userSettings.optional.newWordsPerDay;
    }
  });
  btnBlock.appendChild(renderBtnSettings(userSettings));
  cardBlock.appendChild(renderCardsSettings(userSettings));
  const studyWord = {
    name: 'isShowAllLearningWords',
    textContent: 'Все карточки, требующие изучения',
  };
  renderCheckbox(studyWord, wordBlock, userSettings);
}
