import GameWindow from './gameWindow';
import Game from './game';
import StartPage from './startPage';

export default class Result extends GameWindow {
  constructor(gameScore) {
    super();
    this.gameScore = gameScore;
    this.buttonList = [
      { class: 'back-button', text: 'к списку заданий' },
      { class: 'repeat-button', text: 'повторить' },
      { class: 'parameters-button', text: 'параметры' },
    ];
  }

  getPage() {
    console.log(this.gameScore);
    const body = document.querySelector('body');
    const gameField = document.createElement('div');

    gameField.setAttribute('class', 'game-wrapper');

    body.appendChild(gameField);

    gameField.insertAdjacentHTML('afterbegin', this.getResult());

    gameField.insertAdjacentHTML(
      'beforeEnd',
      `<div class="buttons-block">${this.getButton(this.buttonList)}</div>`
    );

    this.listenToButtonsClick();
  }

  getResult() {
    const result = `
        <div class="score">Ваш результат: ${this.gameScore.score}</div>
        <div class="statistic">${this.getSortedStatistic()}</div>
      `;

    return result;
  }
  getSortedStatistic() {
    const hyperText = `<div>${this.getCorrectWordsBlock()}<hr>${this.getWrongWordsBlock()}</div>`;

    return hyperText;
  }

  getCorrectWordsBlock() {
    return `
        <div class="correct-words">
          Знаю <span class="correct-words-count">${
            this.gameScore.correctWords.length
          }</span>
            ${this.gameScore.correctWords
              .map((word) => this.getWordStatisticLine(word))
              .join('')}
        </div>`;
  }

  getWrongWordsBlock() {
    return `
      <div class="wrong-words">
        Ошибок <span class="wrong-words-count">${
          this.gameScore.wrongWords.length
        }</span>
          ${this.gameScore.wrongWords
            .map((word) => this.getWordStatisticLine(word))
            .join('')}
      </div>`;
  }

  getWordStatisticLine(word) {
    return `
        <div>
          <span class="word-audio" data-source="${word.audioExample}"></span>
          <span class="word">${word.word}</span>
          <span class="word-translation"> — ${word.wordTranslate}</span>
        </div>`;
  }

  listenToButtonsClick() {
    const buttons = document.querySelector('.buttons-block');

    buttons.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        if (event.target.classList.contains('parameters-button')) {
          this.openStartPage(new StartPage());
        }

        if (event.target.classList.contains('back-button')) {
          this.redirectToMainPage();
        }

        if (event.target.classList.contains('repeat-button')) {
          this.openGamePage(new Game());
        }
      }
    });
  }

  listenToSpeakerClick() {
    const speakers = document.querySelectorAll('.word-audio');

    speakers.forEach((speaker) => {
      speaker.addEventListener('click', (event) => {
        console.log(event.target.classList);
      });
    });
  }
}
