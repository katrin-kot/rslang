import PubSub from '../../controllers/pubSub';
import GameController from '../../controllers/game';

class ResultPageView {
  constructor() {
    this.template = `
      <div class="result__wrapper hidden">
        <div class="result__container">
          <p class="result-attempts">
            Attempts to pronounce: <span class="count-attempts-pronounce">0</span>
          </p>
          <p class="result-wrong">
            Errors: <span class="count-wrong-words">0</span>
          </p>
          <div class="result-wrong-items"></div>
          <p class="result-right">
            Success: <span class="count-right-words">0</span>
          </p>
          <div class="result-right-items"></div>
          <div class="result-btns__wrapper">
            <button class="btn-return menu-btns">Return</button>
            <button class="btn-new-game menu-btns">New Game</button>
          </div>
          <div class="btn-stats__wrapper">
            <button class="btn-show-stats menu-btns">Statistics</button>
            <button class="btn-main-menu menu-btns">Main menu</button>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const appContainer = document.querySelector('.app-speakIt');
    appContainer.insertAdjacentHTML('beforeend', this.template);
    this.resultBtnsClickHandler();
    this.resultWordsClickHandler();
  }

  resultBtnsClickHandler() {
    document.querySelector('.result__container').addEventListener('click', (e) => {
      const resultWrapper = document.querySelector('.result__wrapper');

      if (e.target.classList.contains('btn-return')) {
        resultWrapper.classList.add('hidden');
        document.querySelector('.speakIt__content__wrapper').classList.remove('none');
      }

      if (e.target.classList.contains('btn-new-game')) {
        PubSub.publish('newGame');
        resultWrapper.classList.add('hidden');
      }

      if (e.target.classList.contains('btn-show-stats')) {
        PubSub.publish('showStatsPage');
      }

      if (e.target.classList.contains('btn-main-menu')) {
        PubSub.publish('redirectOnMain');
      }
    });
  }

  showResultPage(currentWords) {
    document.querySelector('.result__wrapper').classList.remove('hidden');
    document.querySelector('.speakIt__content__wrapper').classList.add('none');

    const wrongAnswersWrapper = document.querySelector('.result-wrong-items');
    const rightAnswersWrapper = document.querySelector('.result-right-items');
    const answers = document.querySelectorAll('[data-answer]');
    const quantityErrors = document.querySelector('.count-wrong-words');
    const quantitySuccess = document.querySelector('.count-right-words');
    const quantityAttemptsPronounce = document.querySelector('.count-attempts-pronounce');

    if (!answers.length) {
      return;
    }

    let templateWrongAnswers = '';
    let templateRightAnswers = '';
    let counter = 0;

    answers.forEach((el) => {
      const currentElement = currentWords[el.dataset.index];
      if (parseInt(el.getAttribute('data-answer'), 10) === 0) {
        counter += 1;
        templateWrongAnswers += this.wordTemplate(currentElement);
      } else {
        templateRightAnswers += this.wordTemplate(currentElement);
      }
    });

    quantityErrors.innerHTML = counter;
    quantitySuccess.innerHTML = answers.length - counter;
    wrongAnswersWrapper.innerHTML = templateWrongAnswers;
    rightAnswersWrapper.innerHTML = templateRightAnswers;
    quantityAttemptsPronounce.innerHTML = GameController.getQuantityAttemptsPronounce();
  }

  resultWordsClickHandler() {
    document.querySelector('.result__container').addEventListener('click', (e) => {
      if (e.target.closest('.answer-item')) {
        PubSub.publish('playVoiceResultWord', this.getAudioSrc(e.target.closest('.answer-item'), 'data-answer-audio'));
      }

      if (e.target.closest('.answer-item-example')) {
        PubSub.publish('playVoiceResultWord', this.getAudioSrc(e.target.closest('.answer-item-example'), 'data-answer-audioExample'));
      }

      if (e.target.closest('.answer-item-image')) {
        PubSub.publish('showPopup', e.target.closest('.answer-item-image').dataset.popupImgSrc);
      }
    });
  }

  getAudioSrc(element, dataAttribute) {
    return element.getAttribute(dataAttribute);
  }

  wordTemplate(currentElement) {
    const { audio } = currentElement;
    const { word } = currentElement;
    const { transcription } = currentElement;
    const { wordTranslate } = currentElement;
    const { audioExample } = currentElement;
    const { image } = currentElement;
    return `
      <div class="answer-item__wrapper">
        <div class="answer-item" data-answer-audio="${audio}">
          <div class="card-micro-img small"></div>
          <p>${word}</p>
          <p>${transcription}</p>
          <p>${wordTranslate}</p>
        </div>
        <div class="answer-item-example" data-answer-audioExample="${audioExample}">
          Example: 
          <button class="btn-play-item-example">
            <div class="play-button-icon small"></div>
          </button>
        </div>
        <div class="answer-item-image" data-popup-img-src="${image}">Watch image</div>
      </div>
    `;
  }
}

export default new ResultPageView();
