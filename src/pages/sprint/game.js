import GameWindow from './gameWindow';
import CountdownTimer from './timer';
import { getWordforGame } from '../../services/userWordService';
import { checkUserLogin } from '../../services/verifyUserService';

export default class Game extends GameWindow {
  constructor() {
    super();
    this.timer = new CountdownTimer();
    this.buttonList = [
      {
        class: 'wrong-answer-button',
        text:
          '<img src="https://image.flaticon.com/icons/svg/134/134209.svg" alt="" width="35px" height="35px"> Неверно',
      },
      {
        class: 'correct-answer-button',
        text:
          'Верно <img src="https://image.flaticon.com/icons/svg/134/134208.svg" alt="" width="35px" height="35px">',
      },
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

  async initPage(startPage, gamePage, resultPage) {
    this.startPage = startPage;
    this.gamePage = gamePage;
    this.resultPage = resultPage;

    this.toggleLoader(false);
    checkUserLogin();
    this.updateSettings();
    this.clearStatistic();
    await this.checkNewWords(true);
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
      <div class="main-block">
        <div id="btn-home">
          <button class="btn-main-page">
            <span class="circle" aria-hidden="true">
              <span class="icon arrow"></span>
            </span>
            <a href="/index.html" class="button-text">На главную</a>
          </button>
        </div>
        <div class="game-wrapper">
          <div class="game-bonus yellow">
            <div class="game-score">
              <span class="inner-content">0</span>
              <span class="added-score"></span>
              ${this.getCanvas()}
              <div class="audio-check audio-true"></div>
            </div>
          </div>
          ${this.getGameImage()}
          <div class="word-block">
            <div class="speaker">
              <img src="https://cdn.discordapp.com/attachments/624997901248233505/728348020193886218/speaker.svg">
            </div>
            ${this.addDivByClass('game-word')}
            ${this.addDivByClass('game-translation')}
          </div>

          <hr>
          <div class="answer-check"></div>
          ${this.addDivByClass('buttons-block', this.getButton(this.buttonList))}
        </div>
      </div>
    `;

    body.insertAdjacentHTML('afterbegin', gameField);

    this.listenToButtonsClick();
    this.listenToAudioButtonClick();
    this.listenAudioCheckClick();
    this.activateTimer();

    this.checkNewWords();
  }

  activateTimer() {
    const MILLISECONDS_IN_MINUTE = 60000;
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
          const word = document.querySelector('.game-word');

          if (word.innerText) {
            this.checkAnswer(event.target.classList);
            this.checkNewWords();
          }
          // eslint-disable-next-line no-empty
        } catch (err) {}
      }
    });

    document.addEventListener('keyup', (key) => {
      try {
        const word = document.querySelector('.game-word');
        let currentAnswer = '';

        if (key.code === 'ArrowRight') {
          currentAnswer = document.querySelector('.correct-answer-button');
        } else if (key.code === 'ArrowLeft') {
          currentAnswer = document.querySelector('.wrong-answer-button');
        }

        if (word.innerText) {
          this.checkAnswer(currentAnswer.classList);
          this.checkNewWords();
        }
        // eslint-disable-next-line no-empty
      } catch (err) {}
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

  listenAudioCheckClick() {
    const audio = document.querySelector('.audio-check');

    audio.addEventListener('click', () => {
      audio.classList.toggle('audio-false');
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
      this.audioSignal(true);
      this.videoSignal(true);
      this.updateScore(true);
      this.updateRoof();
    } else {
      this.correctQueue = 0;
      this.audioSignal(false);
      this.videoSignal(false);
      this.updateScore(false);
      this.updateRoof();
    }
  }

  async checkNewWords(isPreload = false) {
    if (this.words.ingameWords.length < 10) {
      if (isPreload) {
        await this.getWordsByServer();
        this.round = (Number(this.round) + 1) % this.maxPages;
      } else {
        this.getWordsByServer();
        this.round = (Number(this.round) + 1) % this.maxPages;
      }
    }

    if (!isPreload) {
      this.showWordData();
    } else {
      this.toggleLoader(true);
    }
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

  updateScore(isCorrect) {
    const currentScore = document.querySelector('.game-score .inner-content');
    const addedScore = document.querySelector('.game-score .added-score');
    const additional = this.calculateScore();

    if (isCorrect) {
      this.words.score += additional;
      currentScore.innerText = this.words.score;
      addedScore.innerText = `+${additional} очков за слово`;
    } else {
      addedScore.innerText = '';
    }
  }

  updateRoof() {
    const roofDiv = document.querySelector('.game-bonus');
    const roofType = Math.floor(this.correctQueue / 4);

    roofDiv.classList.remove('yellow', 'green', 'blue');

    switch (roofType) {
      case 0: {
        roofDiv.classList.add('yellow');
        break;
      }
      case 1: {
        roofDiv.classList.add('green');
        break;
      }
      default: {
        roofDiv.classList.add('blue');
        break;
      }
    }
  }

  audioSignal(isCorrect) {
    const updateMultiply = !(this.correctQueue % 4 > 0);
    const isMusic = document.querySelector('.audio-false');

    if (!isMusic) {
      if (isCorrect) {
        if (updateMultiply) {
          new Audio('/assets/audio/correct.mp3').play();
          new Audio('/assets/audio/correct.mp3').play();
        } else {
          new Audio('/assets/audio/correct.mp3').play();
        }
      } else {
        new Audio('/assets/audio/error.mp3').play();
      }
    }
  }

  videoSignal(isCorrect) {
    const answerCheckDiv = document.querySelector('.answer-check');

    answerCheckDiv.classList.remove('correct-answer-icon', 'wrong-answer-icon');

    if (isCorrect) {
      answerCheckDiv.classList.toggle('correct-answer-icon');
    } else {
      answerCheckDiv.classList.toggle('wrong-answer-icon');
    }

    answerCheckDiv.animate(
      [
        {
          opacity: 1,
        },
        {
          opacity: 0,
        },
      ],
      {
        duration: 1000,
        iterations: 1,
      },
    );
  }

  calculateScore() {
    const multiply = Math.floor(this.correctQueue / 4);
    const addedScore = 10 * 2 ** multiply;

    return addedScore;
  }
}
