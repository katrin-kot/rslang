import createNode from '../../helpers/createNode';
import { getUserID } from '../../services/authService';
import { getUserWord } from '../../services/userWordService';
import { createWordWithError, updateWordWithError } from '../../services/SRgameWordsService';
import StatsPage from './statsPage';

class ResultPage {
  constructor() {
    this.resultPage = createNode('div', 'result__wrapper', 'hidden');
    this.template = `
      <div class="result__container">
        <p class="result-wrong">
          Errors: <span class="count-wrong-words">0</span>
        </p>
        <div class="result-wrong-items"></div>
        <p class="result-right">
          Success: <span class="count-right-words">0</span>
        </p>
        <div class="result-right-items"></div>
        <div class="result-btns__wrapper">
        <button class="btn-main-menu menu-btns">Main menu</button>
        <button class="btn-new-game menu-btns">New Game</button>
        </div>
        <div class="btn-stats__wrapper">
          <button class="btn-show-stats menu-btns">Statistics</button>
        </div>
      </div>
    `;
  }

  render() {
    this.resultPage.insertAdjacentHTML('beforeend', this.template);
    document.querySelector('.wrapper').append(this.resultPage);
    this.resultBtnsClickHandler();
    this.resultWordsClickHandler();
  }

  resultBtnsClickHandler() {
    document.querySelector('.result__container').addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-main-menu')) {
        window.location.pathname = '/index.html';
      }

      if (e.target.classList.contains('btn-new-game')) {
        this.hide();
        document.querySelector('.await-block').classList.remove('hidden');
        document.querySelector('.stats-items').innerHTML = '';
      }

      if (e.target.classList.contains('btn-show-stats')) {
        StatsPage.showHidePages();
      }
    });
  }

  show(rightWords, wrongWords) {
    this.addWrongAnswersToAnki(wrongWords);
    StatsPage.setGlobalStats(rightWords.length, wrongWords.length);
    this.resultPage.classList.remove('hidden');

    const wrongAnswersWrapper = document.querySelector('.result-wrong-items');
    const rightAnswersWrapper = document.querySelector('.result-right-items');

    let templateWrongAnswers = '';
    let templateRightAnswers = '';

    rightWords.forEach((el) => {
      templateRightAnswers += this.wordTemplate(el);
    });

    wrongWords.forEach((el) => {
      templateWrongAnswers += this.wordTemplate(el);
    });

    document.querySelector('.count-right-words').innerText = rightWords.length;
    document.querySelector('.count-wrong-words').innerText = wrongWords.length;

    wrongAnswersWrapper.innerHTML = templateWrongAnswers;
    rightAnswersWrapper.innerHTML = templateRightAnswers;
  }

  hide() {
    this.resultPage.classList.add('hidden');
  }

  wordTemplate(currentElement) {
    const { audio } = currentElement;
    const { word } = currentElement;
    const { transcription } = currentElement;
    const { wordTranslate } = currentElement;
    return `
      <div class="answer-item__wrapper">
        <div class="answer-item" data-answer-audio="${audio}">
          <div class="card-micro-img small"></div>
          <p>${word}</p>
          <p>${transcription}</p>
          <p>${wordTranslate}</p>
        </div>
      </div>
    `;
  }

  resultWordsClickHandler() {
    document.querySelector('.result__container').addEventListener('click', (e) => {
      if (e.target.closest('.answer-item')) {
        this.playVoiceCard(e.target.closest('.answer-item').dataset.answerAudio);
      }
    });
  }

  playVoiceCard(src) {
    new Audio(`https://raw.githubusercontent.com/bobrui4anin/rslang-data/master/${src}`).play();
  }

  addWrongAnswersToAnki(words) {
    // eslint-disable-next-line no-underscore-dangle
    const wrongWordsId = words.map((word) => word._id);
    wrongWordsId.forEach(async (id) => {
      try {
        await getUserWord({
          userId: getUserID(),
          wordId: id,
        });
        updateWordWithError({
          wordId: id,
        });
      } catch (err) {
        createWordWithError({
          wordId: id,
        });
      }
    });
  }
}

export default new ResultPage();
