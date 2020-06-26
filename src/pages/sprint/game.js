import GameWindow from './gameWindow';
import CountdownTimer from './timer';
import {
  getUserWords,
  addUserWord,
  updateUserWord,
} from '../../services/wordDataService';
import { getFileUrl } from '../../services/multiDataService';
import {} from '../../services/userWordService';

export default class Game extends GameWindow {
  constructor() {
    super();
    this.difficult = localStorage.difficultSprint;
    this.useCartoons = localStorage.cartoonSprint;
    this.useStudied = localStorage.studiedSprint;
    this.userData = this.getUserData({
      userID: localStorage.userID,
      token: localStorage.token,
    });
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
  /*
  async test() {
    const data = await getUserWord({
      userID: localStorage.userID,
      token: localStorage.token,
    });
    console.log(data);

    const addedData = await addUserWord({
      userID: localStorage.userID,
      token: localStorage.token,
      wordID: '5e9f5ee35eb9e72bc21af716',
      word: { optional: { test: 'test123' } },
    });
    console.log(addedData);

    for (let i = 17; i < 50; i++) {
      await addUserWord({
        userID: localStorage.userID,
        token: localStorage.token,
        wordID: `5e9f5ee35eb9e72bc21af7${i}`,
        word: { optional: { test: 'test' } },
      });
    }
    const pushData = await updateUserWord({
      userID: localStorage.userID,
      token: localStorage.token,
      wordID: '5e9f5ee35eb9e72bc21af716',
      word: { optional: { test: 'test' } },
    });
    console.log(pushData);

    const data2 = await getUserWord({
      userID: localStorage.userID,
      token: localStorage.token,
    });
    console.log(data2);
  } */

  async getUserData(user) {
    const userData = await getUserWords(user);

    return userData;
  }

  initPage(startPage, gamePage, resultPage) {
    this.startPage = startPage;
    this.gamePage = gamePage;
    this.resultPage = resultPage;

    this.getPage();
  }

  getPage() {
    const body = document.querySelector('body');
    const gameField = document.createElement('div');

    gameField.setAttribute('class', 'game-wrapper');

    body.appendChild(gameField);

    gameField.insertAdjacentHTML(
      'beforebegin',
      this.addDivByClass('game-score', 0),
    );

    const gameScore = document.querySelector('.game-score');

    gameScore.insertAdjacentHTML('afterbegin', this.getCanvas());

    gameField.insertAdjacentHTML(
      'afterbegin',
      this.addDivByClass('game-bonus'),
    );

    gameField.insertAdjacentHTML('beforeend', this.getGameImage());

    gameField.insertAdjacentHTML('beforeend', this.addDivByClass('game-word'));

    gameField.insertAdjacentHTML(
      'beforeend',
      this.addDivByClass('game-translation'),
    );

    gameField.insertAdjacentHTML('beforeend', '<hr>');

    gameField.insertAdjacentHTML(
      'beforeEnd',
      this.addDivByClass('buttons-block', this.getButton(this.buttonList)),
    );

    this.listenToButtonsClick();
    this.activateTimer();

    this.checkNewWords();
  }

  activateTimer() {
    const MILLISECONDS_IN_MINUTE = 60000;
    const MILLISECONDS_IN_SECOND = 1000;
    let seconds = 0;

    this.timer.renderTimer();
    const timerId = setInterval(
      () => this.timer.updateTimer((seconds += 1)),
      MILLISECONDS_IN_SECOND,
    );
    setTimeout(() => {
      clearInterval(timerId);
      this.openResultPage(
        this.startPage,
        this.gamePage,
        this.resultPage,
        this.words,
      );
    }, MILLISECONDS_IN_MINUTE);
  }

  getGameImage() {
    const image = '<img class="game-image" src="https://cdn.discordapp.com/attachments/720535785622995023/721061601393770546/Octopus_-_Opt_2.png">';

    return image;
  }

  getCanvas() {
    const canvas = '<canvas class="countdown-timer"></canvas>';

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

  async getWordsByServer() {
    const randomPage = this.randomNumber();
    const rawResponse = await fetch(
      `https://afternoon-falls-25894.herokuapp.com/words?page=${randomPage}&group=${this.difficult}`,
    );

    const content = await rawResponse.json();
    this.words.usePages.splice(randomPage, 1);
    this.words.ingameWords.push(...content);
    this.words.recievedWords.push(...content);
  }

  checkAnswer(answer) {
    if (
      (this.lastResult && answer.contains('correct-answer-button'))
      || (!this.lastResult && answer.contains('wrong-answer-button'))
    ) {
      this.updateCorrectWords();
      this.correctQueue += 1;
      this.updateScore();
    } else {
      this.correctQueue = 0;
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

    this.showImage(wordObj.image);
    this.updateWrongWords(wordObj);
  }

  showImage(source) {
    const image = document.querySelector('.game-image');

    if (this.useCartoons === 'true') {
      image.setAttribute('src', getFileUrl(source));
    }
  }

  updateWrongWords(word) {
    this.words.wrongWords.push(word);
  }

  updateCorrectWords() {
    this.words.correctWords.push(this.words.wrongWords.pop());
  }

  updateScore() {
    const currentScore = document.querySelector('.game-score span');

    this.words.score += this.calculateScore();
    currentScore.innerText = this.words.score;
  }

  calculateScore() {
    const multiply = Math.floor(this.correctQueue / 4);

    let addedScore = 20;

    if (multiply >= 2) {
      addedScore = 80;
    } else if (multiply === 1) {
      addedScore = 40;
    }

    return addedScore;
  }
}
