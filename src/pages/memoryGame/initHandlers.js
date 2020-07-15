import { renderPlayPage } from './playPage';

export function initHandlers() {
  const card = document.querySelector('.mainCard');
  const formContainer = document.querySelector('form');
  const smallBtn = document.querySelectorAll('.btn-sm');
  const backBtn = document.querySelector('.back');
  function flipCard() {
    card.classList.toggle('flip');
  }
  smallBtn.forEach((btn) => btn.addEventListener('click', flipCard));
  backBtn.addEventListener('click', () => { window.location.pathname = '/'; });
  formContainer.addEventListener('submit', (event) => {
    event.preventDefault();
    let group;
    const radio = document.querySelectorAll('input[type=radio]');
    radio.forEach((elem) => {
      if (elem.checked) {
        group = Number(elem.value);
        localStorage.setItem('group', group);
      }
    });

    const countCards = formContainer.querySelectorAll('option');
    let count;
    countCards.forEach((elem) => {
      if (elem.selected) {
        count = Number(elem.textContent);
        localStorage.setItem('count', count);
      }
    });
    const page = Number(document.querySelector('.form-control').value) - 1;
    localStorage.setItem('memory-page', page);
    renderPlayPage(group, count, page);
  });
}
