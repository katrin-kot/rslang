export default class GameWindow {
  constructor() {}

  getButton(description) {
    const button = description.reduce((hypertext, option) => {
      return (
        hypertext + `<button class="${option.class}">${option.text}</button>`
      );
    }, '');

    return button;
  }

  addDivByClass(divClass, content = '') {
    const div = `<div class="${divClass}">${content}</div>`;

    return div;
  }

  clearGameWindow() {
    const elements = [
      document.querySelector('.game-wrapper'),
      document.querySelector('.game-score'),
    ];

    elements.forEach((element) => {
      element.remove();
    });
  }
}
