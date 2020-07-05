import './settings.css';
import { getUserID } from '../../services/authService';
import {
  putUserSettings,
  getUserSettings,
} from '../../services/settingsService';
import { renderBtnSettings } from './btnSettings';
import { renderCardsSettings } from './cardsSettings';

const body = document.querySelector('body');
const userId = getUserID();

const main = document.createElement('main');
body.appendChild(main);

main.innerHTML = `
<div class ="container shadow-lg mb-5 mt-10 rounded">
<h2 class="main-title">Мои настройки</h2>
<form>
<div class ="section-wrapper row"><div class="col-auto"><h4 class ="section-title mt-1 ml-1" >Настройки изучения слов</h4>
<div class="input-group col-auto mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text text-break" id="basic-addon1">Всего карточек в день (максимум 50)</span>
  </div>
  <input type="number" class="form-control all" min="0" max="50" value="50">
</div>
<div class="input-group col-auto mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text text-break" id="basic-addon1">Количество новых карточек в день</span>
  </div>
  <input type="number" class="form-control new" min="0" max="50" value="50">
</div>
</div></div>
<h4 class ="section-title mt-1" >Настройка кнопок</h4>
<div class="container btn-settings mt-1 ml-1">
</div>
<h4 class ="section-title mt-1" >Настройки информации на карточках</h4>
<div class="container cards-settings mt-1 ml-1">
  
</div>
<button type="submit" class="btn primary btn-lg mt-3">Сохранить</button>
<button type="button" class="btn btn-outline-secondary btn-lg mt-3">Вернуться на главную</button>
</form>
</div>`;

const optional = {};

const btnBlock = document.querySelector('.btn-settings');
const cardBlock = document.querySelector('.cards-settings');
async function initContent() {
  const defaultSettings = await getUserSettings({ userId });
  btnBlock.appendChild(renderBtnSettings(defaultSettings));
  cardBlock.appendChild(renderCardsSettings(defaultSettings));
}
initContent();

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const errorText = document.querySelectorAll('.error-text');
  if (errorText.length > 0) {
    errorText.forEach((elem) => elem.remove());
  }
  document.querySelectorAll('.form-check-input').forEach((elem) => {
    if (elem.checked === true) {
      optional[elem.dataset.name] = true;
    } else {
      optional[elem.dataset.name] = false;
    }
  });
  if (Array.from(cardBlock.querySelectorAll('.form-check-input')).some((elem) => elem.checked === true) === false) {
    cardBlock
      .insertAdjacentHTML(
        'afterend',
        '<p class = "error-text">Нужно отметить хотя бы один пункт</p>',
      );
  } else {
    const newWordsPerDay = document.querySelector('.new').value;
    optional.newWordsPerDay = Number(newWordsPerDay);
    const wordsPerDay = document.querySelector('.all').value;
    if (wordsPerDay < newWordsPerDay) {
      document
        .querySelectorAll('.input-group')[1]
        .insertAdjacentHTML(
          'afterend',
          '<p class = "error-text">Количество новых карточек не должно превышать всех карточек</p>',
        );
    } else {
      putUserSettings({ userId, wordsPerDay, optional });
    }
  }
});

const returnMainpage = document.querySelector('.btn-outline-secondary');
returnMainpage.addEventListener('click', () => {

});
