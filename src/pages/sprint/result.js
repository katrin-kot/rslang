import GameWindow from './gameWindow';
import { getUserWord } from '../../services/userWordService';
import {
  createWordWithError,
  updateWordWithError,
} from '../../services/SRgameWordsService';
import { getStatistics, putStatistics } from '../../services/statsService';

export default class Result extends GameWindow {
  constructor() {
    super();
    this.buttonList = [
      { class: 'back-button', text: 'к списку заданий' },
      { class: 'repeat-button', text: 'повторить' },
      { class: 'parameters-button', text: 'параметры' },
      { class: 'statistic-button', text: 'статистика' },
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
    this.updateUserWordByResult(this.score.wrongWords);
    this.updateServerStatistic();
    const body = document.querySelector('body');

    const resultField = `
      <div class="game-wrapper">
        ${this.getResult()}
        <div class="buttons-block">${this.getButton(this.buttonList)}</div>
      </div>
    `;

    body.insertAdjacentHTML('afterbegin', resultField);

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

  async updateServerStatistic() {
    const date = new Date().toLocaleString();

    const statistic = (await getStatistics({ userId: localStorage.userID })) || {};

    if (!statistic.optional) {
      statistic.optional = {};
    }
    if (!statistic.optional.sprintMinigame) {
      statistic.optional.sprintMinigame = {};
    }
    delete statistic.id;

    statistic.optional.sprintMinigame[date] = {
      level: localStorage.difficultySprint,
      score: `${this.score.correctWords.length}-${this.score.wrongWords.length}`,
      scoreGame: this.score.score,
      errors: this.score.wrongWords.length,
    };

    await putStatistics({
      userId: localStorage.userID,
      payload: statistic,
    });
  }

  filterWrongWords(words) {
    const result = [];

    words.forEach((word) => {
      // eslint-disable-next-line no-underscore-dangle
      if (result.indexOf(word._id) < 0) {
        // eslint-disable-next-line no-underscore-dangle
        result.push(word._id);
      }
    });

    return result;
  }

  async updateUserWordByResult(words) {
    const wordIds = this.filterWrongWords(words);

    wordIds.forEach(async (id) => {
      try {
        await getUserWord({
          userId: localStorage.userID,
          wordId: id,
        });
        await updateWordWithError({ wordId: id });
      } catch (err) {
        try {
          await createWordWithError({ wordId: id });
          // eslint-disable-next-line no-empty
        } catch (error) {}
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

        if (event.target.classList.contains('statistic-button')) {
          this.redirectToStatisticPage();
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
