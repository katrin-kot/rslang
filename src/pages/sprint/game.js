import GameWindow from './gameWindow';
import CountdownTimer from './timer';

export default class Game extends GameWindow {
  constructor() {
    super();
    this.timer = new CountdownTimer();
    this.buttonList = [
      { class: 'wrong-answer-button', text: 'Неверно' },
      { class: 'correct-answer-button', text: 'Верно' },
    ];
  }

  getPage() {
    const body = document.querySelector('body');
    const gameField = document.createElement('div');

    gameField.setAttribute('class', 'game-wrapper');

    body.appendChild(gameField);

    gameField.insertAdjacentHTML(
      'beforebegin',
      this.addDivByClass('game-score', 0)
    );

    const gameScore = document.querySelector('.game-score');

    gameScore.insertAdjacentHTML('afterbegin', this.getCanvas());

    gameField.insertAdjacentHTML(
      'afterbegin',
      this.addDivByClass('game-bonus')
    );

    gameField.insertAdjacentHTML('beforeend', this.getGameImage());

    gameField.insertAdjacentHTML('beforeend', this.addDivByClass('game-word'));

    gameField.insertAdjacentHTML(
      'beforeend',
      this.addDivByClass('game-translation')
    );

    gameField.insertAdjacentHTML('beforeend', '<hr>');

    gameField.insertAdjacentHTML(
      'beforeEnd',
      this.addDivByClass('buttons-block', this.getButton(this.buttonList))
    );

    this.activateTimer();
  }

  activateTimer() {
    let seconds = 0;
    this.timer.renderTimer();
    let timerId = setInterval(
      () => this.timer.updateTimer((seconds += 1)),
      1000
    );
    setTimeout(() => {
      clearInterval(timerId);
      //this.clearGameWindow();
    }, 60000);
  }

  getGameImage() {
    const image = `<img class="game-image" src="/assets/default-image.png">`;

    return image;
  }

  getCanvas() {
    const canvas = `<canvas class="countdown-timer"></canvas>`;

    return canvas;
  }
}
