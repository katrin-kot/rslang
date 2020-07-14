export default class GameWindow {
  getPage() {
    const body = document.querySelector('body');
    const gameField = document.createElement('div');

    gameField.setAttribute('class', 'game-wrapper');

    body.appendChild(gameField);
  }

  getButton(description) {
    const button = description.reduce(
      (hypertext, option) => `${hypertext}<button class="${option.class}">${option.text}</button>`,
      '',
    );

    return button;
  }

  addDivByClass(divClass, content = '') {
    const div = `<div class="${divClass}"><span class="inner-content">${content}<span></div>`;

    return div;
  }

  clearGameWindow() {
    const mainBlock = document.querySelector('.main-block');

    mainBlock.remove();
  }

  toggleLoader(wasCreate = false) {
    const body = document.querySelector('body');
    const loader = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
    const loaderDiv = document.querySelector('.lds-ellipsis');
    if (wasCreate) {
      loaderDiv.remove();
    } else {
      body.insertAdjacentHTML('afterbegin', loader);
    }
  }

  playAudio(source) {
    const audio = new Audio(
      `https://raw.githubusercontent.com/bobrui4anin/rslang-data/master/${source}`,
    );

    audio.play();
  }

  openStartPage(startPage, gamePage, resultPage) {
    this.clearGameWindow();

    startPage.initPage(startPage, gamePage, resultPage);
  }

  redirectToMainPage() {
    window.location.pathname = '/index.html';
  }

  redirectToStatisticPage() {
    window.location.pathname = '/stats.html';
  }

  openGamePage(startPage, gamePage, resultPage) {
    this.clearGameWindow();

    gamePage.initPage(startPage, gamePage, resultPage);
  }

  openResultPage(startPage, gamePage, resultPage, score) {
    this.clearGameWindow();

    resultPage.initPage(startPage, gamePage, resultPage, score);
  }
}
