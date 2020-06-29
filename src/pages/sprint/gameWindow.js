export default class GameWindow {
  getPage() {
    const body = document.querySelector('body');
    const gameField = document.createElement('div');

    gameField.setAttribute('class', 'game-wrapper');

    body.appendChild(gameField);
  }

  getButton(description) {
    const button = description.reduce(
      (hypertext, option) =>
        `${hypertext}<button class="${option.class}">${option.text}</button>`,
      ''
    );

    return button;
  }

  addDivByClass(divClass, content = '') {
    const div = `<div class="${divClass}"><span class="inner-content">${content}<span></div>`;

    return div;
  }

  clearGameWindow() {
    const elements = [
      document.querySelector('.game-wrapper'),
      document.querySelector('.game-score'),
    ];

    elements.forEach((element) => {
      if (element !== null) {
        element.remove();
      }
    });
  }

  getAudio() {
    const audio = '<audio src="">';
  }

  openStartPage(startPage, gamePage, resultPage) {
    this.clearGameWindow();

    startPage.initPage(startPage, gamePage, resultPage);
  }

  redirectToMainPage() {
    this.clearGameWindow();

    location.replace('http://localhost:3000/main.html');
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
