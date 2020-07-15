import { getUserID } from '../../services/authService';
import { flipLittleCard } from './flipCards';
import { renderStartPage } from './startPage';
import { getWordforGame } from '../../services/userWordService';
import { initHandlers } from './initHandlers';
import { renderSpinner, showSpinner } from './spinner';

export async function renderPlayPage(group, count, page) {
  const body = document.querySelector('body');
  const userId = getUserID();
  body.innerHTML = '';
  renderSpinner();
  showSpinner();
  const score = count * 10;
  const wordsPerPage = count / 2;
  const words = await getWordforGame(userId, group, wordsPerPage, page);
  window.words = words;
  body.innerHTML = `
    <div class = 'game-header row'><button type="button" class="btn btn-secondary btn-lg">Назад</button>
    <div class ='score'>${score}</div></div>
    <section class="memory-game">
    </section>`;
  const section = document.querySelector('.memory-game');
  let countCards = count;
  if (countCards > 20) {
    countCards = 20;
  }
  while (countCards > 0) {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    const idx = Math.abs(Math.round(countCards / 2 - 1));
    card.setAttribute('data-content', words[idx].word);
    // eslint-disable-next-line no-underscore-dangle
    card.setAttribute('data-id', words[idx]._id);
    if (countCards % 2 === 0) {
      card.innerHTML = `
       <div class="front-face">${words[idx].word}</div>
       <img class="back-face" src="../../../assets/images/logo.png" alt="Memory Card">
       `;
    } else {
      card.innerHTML = `<div class="front-face">${words[idx].wordTranslate}</div>
       <img class="back-face" src="../../../assets/images/logo.png" alt="Memory Card"></img>`;
    }
    section.appendChild(card);
    countCards -= 1;
  }
  const cards = document.querySelectorAll('.memory-card');
  (function shuffle() {
    cards.forEach((card) => {
      const ramdomPos = Math.floor(Math.random() * count);
      card.style.order = ramdomPos;
    });
  }(count));
  cards.forEach((elem) => elem.classList.add('flip'));
  setTimeout(() => {
    document
      .querySelectorAll('.flip')
      .forEach((elem) => elem.classList.remove('flip'));
  }, 5000);
  cards.forEach((elem) => {
    elem.addEventListener('click', flipLittleCard);
  });
  const btn = document.querySelector('.btn-secondary');
  btn.addEventListener('click', () => {
    renderStartPage();
    initHandlers();
  });
  return body;
}
