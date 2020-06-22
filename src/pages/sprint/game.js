import GameWindow from './gameWindow';
import CountdownTimer from './timer';
import Result from './result';

export default class Game extends GameWindow {
  constructor() {
    super();
    this.timer = new CountdownTimer();
    this.buttonList = [
      { class: 'wrong-answer-button', text: 'Неверно' },
      { class: 'correct-answer-button', text: 'Верно' },
    ];

    this.correctQueue = 0;
    this.lastResult = this.randomNumber(0, 1);
    this.words = {
      score: 0,
      recievedWords: [],
      ingameWords: [],
      correctWords: [],
      wrongWords: [],
      usePages: [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
      ],
    };
    this.maxPages = 30;
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

    this.listenToButtonsClick();
    this.activateTimer();

    this.checkNewWords();
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
      this.openResultPage(new Result(this.words));
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

  listenToButtonsClick() {
    const buttons = document.querySelector('.buttons-block');

    buttons.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        this.checkAnswer(event.target.classList);
        this.checkNewWords();
      }
    });
  }

  async getWordsByServer(group = 0) {
    const randomPage = this.randomNumber();
    const rawResponse = await fetch(
      `https://afternoon-falls-25894.herokuapp.com/words?page=${randomPage}&group=${group}`
    );

    const content = await rawResponse.json();
    this.words.usePages.splice(randomPage, 1);
    this.words.ingameWords.push(...content);
    this.words.recievedWords.push(...content);
  }

  checkAnswer(answer) {
    if (
      (this.lastResult && answer.contains('correct-answer-button')) ||
      (!this.lastResult && answer.contains('wrong-answer-button'))
    ) {
      this.updateCorrectWords();
    }
  }

  async checkNewWords() {
    if (this.words.ingameWords.length < 10) {
      await this.getWordsByServer();
    }

    this.showWordData();
  }

  randomNumber(min = 0, max = this.words.usePages.length) {
    const rand = Math.round(min - 0.5 + Math.random() * (max - min + 1));

    return rand;
  }

  showWordData() {
    const wordDiv = document.querySelector('.game-word');
    const translationDiv = document.querySelector('.game-translation');
    const wordObj = this.words.ingameWords.pop();
    this.lastResult = this.randomNumber(0, 1);
    let currentTranslate = wordObj.wordTranslate;

    if (!this.lastResult) {
      currentTranslate = this.words.ingameWords[
        this.randomNumber(0, this.words.ingameWords.length - 2)
      ].wordTranslate;
    }

    wordDiv.innerHTML = wordObj.word;
    translationDiv.innerHTML = currentTranslate;

    this.updateWrongWords(wordObj);
  }

  updateWrongWords(word) {
    this.words.wrongWords.push(word);
  }

  updateCorrectWords() {
    this.words.correctWords.push(this.words.wrongWords.pop());
  }
}
