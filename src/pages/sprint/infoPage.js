import './infoPage.css';

const clearWindow = () => {
  const infoBlock = document.querySelector('.info-wrapper');

  infoBlock.remove();
};

const listenToStart = (startPage, gamePage, resultPage) => {
  const button = document.querySelector('.begin-button');

  button.addEventListener('click', () => {
    clearWindow();
    startPage.initPage(startPage, gamePage, resultPage);
  });
};

const listenToClose = () => {
  const closeButton = document.querySelector('.close-game');

  closeButton.addEventListener('click', () => {
    window.location.pathname = '/index.html';
  });
};

export const infoPage = (startPage, gamePage, resultPage) => {
  const body = document.querySelector('body');

  const info = `
    <button class="close-game"></button>
    <div class="info-wrapper">
      <div class="info-block">
        <div class="game-name">
          <h1>
            С П Р И Н Т
          </h1>
        </div>
        <div class="information">
          Тренировка Спринт позволяет проверить реакцию, лексикон и немножко интуицию. Чем дольше ты не ошибаешься, тем больше очков получаешь.
        </div>
        <div class="buttons-block">
          <button class="begin-button">Начнём!</button>
        </div>
      </div>
    </div>
    `;

  body.insertAdjacentHTML('afterbegin', info);

  listenToStart(startPage, gamePage, resultPage);
  listenToClose();
};
