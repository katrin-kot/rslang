import CardGame from './CardGame';
import { showSpinner, hideSpinner } from './spinner';
import { createElement } from './helpers';

const hideScreen = () => {
  document.querySelector('.swiper-button-next').style.display = 'flex';
  document.querySelector('.start-screen-container-wrapper').style.display = 'none';
};

export const renderNewGame = async () => {
  hideScreen();
  showSpinner();
  const game = new CardGame();
  await game.renderGameNewCards();
  hideSpinner();
};

export const renderHardGame = async () => {
  hideScreen();
  showSpinner();
  const game = new CardGame();
  await game.renderGameHardCards();
  hideSpinner();
};

export const renderLearningGame = async () => {
  hideScreen();
  showSpinner();
  const game = new CardGame();
  await game.renderGameLearningCards();
  hideSpinner();
};

export const renderGame = async () => {
  hideScreen();
  showSpinner();
  const game = new CardGame();
  await game.renderGameLearningAndNewCards();
  hideSpinner();
};

export const renderNoWordNotification = () => {
  const fade = createElement('div', 'fade display-none');
  const container = createElement('div', 'notification-container no-words-container');
  const closeBtn = createElement('button', 'close-btn', 'Закрыть');
  const template = `
  <img id="logo" class ="logo" src="/assets/images/logo.png" alt="logo">
  <p>Нет карточек для изучения!</span></p>`;
  container.innerHTML = template;

  closeBtn.addEventListener('click', hideNoWordNotification);
  container.append(closeBtn);
  fade.append(container);
  document.body.append(fade);
};

export const showNoWordNotification = () => {
  if (document.querySelector('.fade').classList.contains('display-none')) {
    document.querySelector('.fade').classList.remove('display-none');
  }
  document.querySelector('.fade').classList.add('show');
};


export const hideNoWordNotification = () => {
  if (document.querySelector('.fade').classList.contains('show')) {
    document.querySelector('.fade').classList.remove('show');
  }
  document.querySelector('.fade').classList.add('display-none');
};
