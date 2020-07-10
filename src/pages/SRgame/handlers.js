import CardGame from './CardGame';

const hideScreen = () => {
  document.querySelector('.swiper-button-next').style.display = 'flex';
  document.querySelector('.start-screen-container-wrapper').style.display = 'none';
};

export const renderNewGame = () => {
  hideScreen();
  const game = new CardGame();
  game.renderGameNewCards();
};

export const renderHardGame = () => {
  hideScreen();
  const game = new CardGame();
  game.renderGameHardCards();
};

export const renderLearningGame = () => {
  hideScreen();
  const game = new CardGame();
  game.renderGameLearningCards();
};

export const renderGame = () => {
  hideScreen();
  const game = new CardGame();
  game.renderGameLearningAndNewCards();
};
