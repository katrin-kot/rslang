import { initContent } from './initContent';
import { getUserID } from '../../services/authService';
import { putUserSettings } from '../../services/settingsService';

export async function initHandlers() {
  await initContent();
  const userId = getUserID();
  const optional = {};
  const wordBlock = document.querySelector('.word-settings');
  const cardBlock = document.querySelector('.cards-settings');
  const form = document.querySelector('form');
  const disabledBtn = wordBlock.querySelector('.form-check-input');

  disabledBtn.addEventListener('click', (event) => {
    if (!event.target.checked) {
      wordBlock
        .querySelectorAll('input')
        .forEach((item) => item.removeAttribute('disabled'));
    } else {
      wordBlock
        .querySelectorAll('.form-control')
        .forEach((item) => item.setAttribute('disabled', true));
    }
  });
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
    if (
      Array.from(cardBlock.querySelectorAll('.form-check-input')).some(
        (elem) => elem.checked === true,
      ) === false
    ) {
      cardBlock.insertAdjacentHTML(
        'afterend',
        '<p class = "error-text">Нужно отметить хотя бы один пункт</p>',
      );
    } else {
      const newWordsPerDay = document.querySelector('.new').value;
      optional.newWordsPerDay = Number(newWordsPerDay);
      const wordsPerDay = document.querySelector('.all').value;
      const division = wordsPerDay / newWordsPerDay;
      if (division <= 2 && wordsPerDay < newWordsPerDay) {
        document
          .querySelectorAll('.input-group')[1]
          .insertAdjacentHTML(
            'afterend',
            '<p class = "error-text">Количество новых карточек не должно превышать всех карточек и новых карточек должно быть не больше половины всех карточек</p>',
          );
      } else {
        putUserSettings({ userId, wordsPerDay, optional });
      }
    }
  });

  const returnMainpage = document.querySelector('.btn-outline-secondary');
  returnMainpage.addEventListener('click', () => { window.location.pathname = '/index.html'; });
}
