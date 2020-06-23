export default class GameWindow {
  constructor() {}

  getPage() {
    const body = document.querySelector('body');
    const gameField = document.createElement('div');

    gameField.setAttribute('class', 'game-wrapper');

    body.appendChild(gameField);
  }

  getButton(description) {
    const button = description.reduce((hypertext, option) => {
      return (
        hypertext + `<button class="${option.class}">${option.text}</button>`
      );
    }, '');

    return button;
  }

  addDivByClass(divClass, content = '') {
    const div = `<div class="${divClass}"><span>${content}<span></div>`;

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
    const audio = `<audio src="">`;
  }

  openStartPage(startPage) {
    this.clearGameWindow();

    startPage.getPage();
  }

  redirectToMainPage() {
    this.clearGameWindow();

    location.replace('http://localhost:3000/main.html');
  }

  openGamePage(game) {
    this.clearGameWindow();

    game.getPage();
  }

  openResultPage(result) {
    this.clearGameWindow();

    result.getPage();
  }
}
