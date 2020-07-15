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

export const infoPage = (startPage, gamePage, resultPage) => {
  const body = document.querySelector('body');

  const info = `
    <div class="info-wrapper">
      <div class="info-block">
        <div id="btn-home">
          <button class="btn-main-page">
            <span class="circle" aria-hidden="true">
              <span class="icon arrow"></span>
            </span>
            <a href="/index.html" class="button-text">На главную</a>
          </button>
        </div>
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
};
