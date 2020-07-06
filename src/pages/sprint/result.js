import GameWindow from './gameWindow';
import {
  createUserWord,
  getUserWord,
  updateUserWord,
  getAllUserWords,
} from '../../services/userWordService';

export default class Result extends GameWindow {
  constructor() {
    super();
    this.buttonList = [
      { class: 'back-button', text: 'к списку заданий' },
      { class: 'repeat-button', text: 'повторить' },
      { class: 'parameters-button', text: 'параметры' },
    ];
  }

  initPage(startPage, gamePage, resultPage, score) {
    this.startPage = startPage;
    this.gamePage = gamePage;
    this.resultPage = resultPage;
    this.score = score;

    this.getPage();
  }

  getPage() {
    this.updateUserWordByResult(this.score.correctWords);
    this.updateUserWordByResult(this.score.wrongWords);
    console.log(this.score);
    const body = document.querySelector('body');
    const gameField = document.createElement('div');

    gameField.setAttribute('class', 'game-wrapper');

    body.appendChild(gameField);

    gameField.insertAdjacentHTML('afterbegin', this.getResult());

    gameField.insertAdjacentHTML(
      'beforeEnd',
      `<div class="buttons-block">${this.getButton(this.buttonList)}</div>`,
    );

    this.listenToButtonsClick();
    this.listenToSpeakerClick();
  }

  getResult() {
    const result = `
        <div class="score">Ваш результат: ${this.score.score}</div>
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
  this.score.correctWords.length
}</span>
            ${this.score.correctWords
    .map((word) => this.getWordStatisticLine(word))
    .join('')}
        </div>`;
  }

  getWrongWordsBlock() {
    return `
      <div class="wrong-words">
        Ошибок <span class="wrong-words-count">${
  this.score.wrongWords.length
}</span>
          ${this.score.wrongWords
    .map((word) => this.getWordStatisticLine(word))
    .join('')}
      </div>`;
  }

  getWordStatisticLine(word) {
    return `
        <div>
          <span class="word-audio" data-source="${word.audio}"></span>
          <span class="word">${word.word}</span>
          <span class="word-translation"> — ${word.wordTranslate}</span>
        </div>`;
  }

  updateServerStatistic() {
    const result = this.getUserSprintStatistic() || {};

    const date = new Date().toLocaleDateString();
  }

  async getUserSprintStatistic(word) {
    const content = await getUserWord({
      userId: localStorage.userID,
      wordId,
    });

    this.updateUserSprintStatistic();
  }

  async updateUserSprintStatistic() {
    const percent = (
      (this.score.correctWords
        * (this.score.correctWords.length + this.score.wrongWords.length))
      / 100
    ).toFixed();
  }

  async updateUserWordByResult(words) {
    words.forEach(async (item) => {
      try {
        const content = await getUserWord({
          userId: localStorage.userID,
          // eslint-disable-next-line no-underscore-dangle
          wordId: item._id,
        });

        /* await updateUserWord({
          userId: localStorage.userID,
          wordId: item._id,
        }); */
        /* console.log(content); */
      } catch (err) {
        try {
          const wordData = await createUserWord({
            userId: localStorage.userID,
            // eslint-disable-next-line no-underscore-dangle
            wordId: item._id,
          });
          console.log(wordData);
          console.log(123);
          wordData.optional.status = 'to_study';
          console.log(wordData);

          const updatedData = await updateUserWord({
            userId: localStorage.userID,
            // eslint-disable-next-line no-underscore-dangle
            wordId: item._id,
            word: wordData,
          });
        } catch (err) {}
      }
    });
  }

  listenToButtonsClick() {
    const buttons = document.querySelector('.buttons-block');

    buttons.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        if (event.target.classList.contains('parameters-button')) {
          this.openStartPage(this.startPage, this.gamePage, this.resultPage);
        }

        if (event.target.classList.contains('back-button')) {
          this.redirectToMainPage();
        }

        if (event.target.classList.contains('repeat-button')) {
          this.openGamePage(this.startPage, this.gamePage, this.resultPage);
        }
      }
    });
  }

  listenToSpeakerClick() {
    const speakers = document.querySelectorAll('.word-audio');

    speakers.forEach((speaker) => {
      speaker.addEventListener('click', (event) => {
        this.playAudio(event.target.getAttribute('data-source'));
      });
    });
  }
}
