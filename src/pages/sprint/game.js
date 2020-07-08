import GameWindow from './gameWindow';
import CountdownTimer from './timer';
import { getWordforGame } from '../../services/userWordService';

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
    };
    this.maxPages = 30;
  }

  initPage(startPage, gamePage, resultPage) {
    this.startPage = startPage;
    this.gamePage = gamePage;
    this.resultPage = resultPage;
    this.updateSettings();
    this.clearStatistic();
    this.getPage();
  }

  updateSettings() {
    this.difficulty = localStorage.difficultySprint;
    this.useCartoons = localStorage.cartoonSprint;
    this.useStudied = localStorage.studiedSprint;
    this.userId = localStorage.userID;
    this.round = localStorage.roundSprint;
  }

  clearStatistic() {
    this.correctQueue = 0;
    this.words.score = 0;
    this.words.recievedWords = [];
    this.words.ingameWords = [];
    this.words.correctWords = [];
    this.words.wrongWords = [];
  }

  getPage() {
    const body = document.querySelector('body');

    const gameField = `
      <div class="game-wrapper">
        <div class="game-bonus">
          <div class="game-score">
            <span class="inner-content">0</span>
            ${this.getCanvas()}
            <div class="speaker">
              <img src="https://cdn.discordapp.com/attachments/624997901248233505/728348020193886218/speaker.svg">
            </div>
          </div>
        </div>
        ${this.getGameImage()}
        ${this.addDivByClass('game-word')}
        ${this.addDivByClass('game-translation')}
        <hr>
        ${this.addDivByClass('buttons-block', this.getButton(this.buttonList))}
      </div>
    `;

    body.insertAdjacentHTML('afterbegin', gameField);

    this.listenToButtonsClick();
    this.listenToAudioButtonClick();
    this.activateTimer();

    this.checkNewWords();
  }

  activateTimer() {
    const MILLISECONDS_IN_MINUTE = 6000;
    const MILLISECONDS_IN_SECOND = 1000;
    let seconds = 0;

    this.timer.renderTimer();
    const timerId = setInterval(() => {
      seconds += 1;
      return this.timer.updateTimer(seconds);
    }, MILLISECONDS_IN_SECOND);
    setTimeout(() => {
      clearInterval(timerId);
      this.clearLastWord();
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
        try {
          this.checkAnswer(event.target.classList);
          this.checkNewWords();
          // eslint-disable-next-line no-empty
        } catch (err) {}
      }
    });
  }

  listenToAudioButtonClick() {
    const audio = document.querySelector('.speaker');

    audio.addEventListener('click', () => {
      this.playAudio(
        this.words.wrongWords[this.words.wrongWords.length - 1].audio,
      );
    });
  }

  async getWordsByServer() {
    const obj = {
      userId: localStorage.userID,
      group: Number(localStorage.difficultySprint),
      wordsPerPage: 20,
      page: Number(this.round),
    };

    let content = await getWordforGame(
      obj.userId,
      obj.group,
      obj.wordsPerPage,
      obj.page,
    );

    if (content.length < 10) {
      content = await this.getWords(obj.group, obj.wordsPerPage, obj.page);
    }

    this.words.ingameWords.push(...content);
    this.words.recievedWords.push(...content);
  }

  async getWords(group, wordsPerPage, page) {
    const rawResponse = await fetch(
      `https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}&wordsPerPage=${wordsPerPage}`,
      {
        method: 'GET',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          Accept: 'application/json',
        },
      },
    );

    const content = await rawResponse.json();

    return content;
  }

  checkAnswer(answer) {
    if (
      (this.lastResult && answer.contains('correct-answer-button'))
      || (!this.lastResult && answer.contains('wrong-answer-button'))
    ) {
      this.updateCorrectWords();
      this.correctQueue += 1;
      this.updateScore();
      this.showAnswer(true);
    } else {
      this.correctQueue = 0;
      this.showAnswer(false);
    }
  }

  async checkNewWords() {
    if (this.words.ingameWords.length < 10) {
      await this.getWordsByServer();
      this.round = (Number(this.round) + 1) % this.maxPages;
    }

    this.showWordData();
  }

  randomNumber(min = 0, max = 30) {
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
      image.setAttribute(
        'src',
        `https://raw.githubusercontent.com/bobrui4anin/rslang-data/master/${source}`,
      );
    }
  }

  updateWrongWords(word) {
    this.words.wrongWords.push(word);
  }

  clearLastWord() {
    this.words.wrongWords.pop();
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

  showAnswer(result) {
    const bonus = document.querySelector('.game-bonus');
    let queue = 1;

    if (this.correctQueue > 6) {
      queue = 3;
    } else if (this.correctQueue > 3) {
      queue = 2;
    }

    for (let i = 1; i < 4; i += 1) {
      bonus.classList.remove(`correct-shadow-${i}`);
    }

    bonus.classList.remove('wrong-shadow');

    const shadowClass = result ? `correct-shadow-${queue}` : 'wrong-shadow';

    bonus.classList.add(shadowClass);
  }
}
