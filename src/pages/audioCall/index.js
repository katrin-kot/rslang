/* eslint-disable no-param-reassign */
import './audioCall.css';
import createNode from '../../helpers/createNode';
import diffLevel from '../../components/main/difficultOptions/difficultOptions';
import { getWordforGame } from './words';
import { checkUserLogin } from '../../services/verifyUserService';
import ResultPage from './resultPage';
import StatsPage from './statsPage';

const QUANTITY_BUTTONS = 5;
const MIN_QUANTITY_WORDS = 10;
const MAX_QUANTITY_WORDS = 20;
const MIN_QUANTITY_RAUNDS = 0;
const MAX_QUANTITY_RAUNDS = 29;

class Game {
  constructor() {
    this.trueAnswers = [];
    this.wrongAnswers = [];
    this.isAnswered = false;
    this.app = document.querySelector('body');

    this.appContainer = createNode('div', 'wrapper');
    this.startPage = createNode('div', 'start-page');

    this.startPageTitle = createNode('h1', 'start-page__title');
    this.startPageTitle.textContent = 'Аудиовызов';

    this.startPageDescription = createNode('p', 'start-page__description');
    this.startPageDescription.textContent = 'Вы услышите аудио слова на английском, ваша задача заключается в нахождении перевода слова из перечисленных вариантов.';

    this.startPageButton = createNode('button', 'start-page__button');
    this.startPageButton.textContent = 'Начать';

    this.app.append(this.appContainer);
  }

  async render() {
    this.startLoading();
    await checkUserLogin();

    this.startPage.append(this.startPageTitle, this.startPageDescription, this.startPageButton);
    this.appContainer.append(this.startPage);

    this.startGame();
    this.stopLoading();
  }

  startLoading() {
    this.loading = createNode('div', 'loading');
    this.appContainer.append(this.loading);
  }

  stopLoading() {
    this.loading.remove();
  }

  startGame() {
    this.startPageButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.startPage.classList.add('hidden');

      this.displayGame();
    });
  }

  displayGame() {
    this.awaitBlock = createNode('div', 'await-block');

    this.diffLevel = createNode('div', 'difficult-block');
    this.diffLevel.innerHTML = diffLevel();

    this.form = createNode('div', 'await-block__form');

    this.inputField = createNode('input', 'form__input');
    this.inputField.setAttribute('placeholder', 'Введите количество слов');
    this.inputField.setAttribute('required', 'true');

    this.raundTitle = createNode('span', 'raund__title');
    this.raundTitle.innerText = 'Введите раунд игры';

    this.selectRound = createNode('input', 'form__round');
    this.selectRound.setAttribute('type', 'number');
    this.selectRound.setAttribute('min', '0');
    this.selectRound.setAttribute('max', '29');
    this.selectRound.setAttribute('required', 'true');

    this.btnHomeTemplate = `
      <div id="btn-home">
        <button class="btn-main-page">
          <span class="circle" aria-hidden="true">
            <span class="icon arrow"></span>
          </span>
          <a href="/index.html" class="button-text">На главную</a>
        </button>
      </div>
    `;

    this.submitButton = createNode(
      'button',
      'button',
      'form__button',
      'button--start',
    );
    this.submitButton.setAttribute('type', 'submit');
    this.submitButton.setAttribute('id', 'submitButton');
    this.submitButton.textContent = 'Продолжить';

    this.form.append(
      this.inputField,
      this.raundTitle,
      this.selectRound,
      this.diffLevel,
      this.submitButton,
    );

    this.awaitBlock.append(this.form);
    this.appContainer.append(this.awaitBlock);
    ResultPage.render();
    StatsPage.render();

    this.form.addEventListener('click', (e) => {
      if (e.target.closest('.label-difficult')) {
        localStorage.setItem('difficultAudioCall', e.target.previousElementSibling.value);
      }

      if (e.target.classList.contains('button--start')) {
        e.preventDefault();
        this.continueListener();
        this.trueAnswers = [];
        this.wrongAnswers = [];
      }
    });
  }

  continueListener() {
    if (this.error) {
      this.error.remove();
    }

    if (
      !parseInt(this.inputField.value, 10)
      || this.inputField.value > MAX_QUANTITY_WORDS
      || this.inputField.value < MIN_QUANTITY_WORDS
    ) {
      return this.showError('diffLevel');
    }

    if (
      !parseInt(this.selectRound.value, 10)
      || this.selectRound.value < MIN_QUANTITY_RAUNDS
      || this.selectRound.value > MAX_QUANTITY_RAUNDS
    ) {
      return this.showError('raund');
    }

    this.awaitBlock.classList.add('hidden');
    this.startLoading();
    this.updateBody();

    localStorage.setItem('numberOfWords', this.inputField.value);
    localStorage.setItem('raund', this.selectRound.value);

    return this.getInfo(this.inputField.value, this.selectRound.value);
  }

  showError(type) {
    this.error = createNode('p', 'form__error');

    if (type === 'diffLevel') {
      this.error.textContent = 'Внимание! Введите количество слов от 10 до 20';
      this.inputField.value = '';
    }

    if (type === 'raund') {
      this.error.textContent = 'Внимание! Введите раунд от 0 до 29';
      this.selectRound.value = '';
    }
    this.form.prepend(this.error);
  }

  updateBody() {
    this.gameBlock = createNode('div', 'game-block', 'container');

    this.engTopBlock = createNode('div', 'game-block__question');

    this.wordImage = createNode('div', 'game-block__image');

    this.repeatSoundButton = createNode('button', 'button', 'button--repeat');
    this.repeatSoundButton.textContent = 'Прослушать слово';

    this.engWord = createNode('button', 'button', 'button--english');

    this.engTopBlock.append(this.engWord, this.wordImage, this.repeatSoundButton);

    this.rusAnswersSection = createNode('div', 'answers-wrapper');

    for (let i = 0; i < QUANTITY_BUTTONS; i += 1) {
      const answerButton = createNode('button', 'button', 'button--rus');
      answerButton.setAttribute('data-answer', `${i + 1}`);
      this.rusAnswersSection.append(answerButton);
    }

    this.buttonNext = createNode('button', 'button', 'css-arrow', 'button--arrow', 'event-pointer-none');
    this.gameBlock.insertAdjacentHTML('afterbegin', this.btnHomeTemplate);
    this.gameBlock.append(this.engTopBlock, this.rusAnswersSection, this.buttonNext);
    this.appContainer.append(this.gameBlock);

    const clickListener = (event) => {
      event.preventDefault();

      if (event.target.tagName !== 'BUTTON') return;

      if (event.target.textContent === this.engWord.getAttribute('data-trans')) {
        this.getRightAnswer();
      } else {
        this.getWrongAnswer();
      }

      document.querySelectorAll('.button--rus').forEach((item) => item.classList.add('event-pointer-none'));
      event.target.classList.add('activeAnswer');

      this.buttonNext.classList.remove('event-pointer-none');
    };

    this.rusAnswersSection.addEventListener('click', clickListener);

    this.repeatSoundButton.addEventListener('click', (event) => {
      event.preventDefault();
      new Audio(`https://raw.githubusercontent.com/bobrui4anin/rslang-data/master/${this.repeatSoundButton.dataset.audioSrc}`).play();
    });

    this.buttonNext.addEventListener('click', (event) => {
      event.preventDefault();
      this.addPointerOnCards();
      this.buttonNext.classList.remove('event-pointer-none');
      if (!this.isAnswered) {
        this.getWrongAnswer();
        this.gameProgress();
      } else {
        this.gameProgress();
      }
    });
  }

  gameProgress() {
    if (this.data.length) {
      this.updateButtonsContent();
    } else {
      this.disabelBtnNext();
      ResultPage.show(this.trueAnswers, this.wrongAnswers);
      this.removeGameBlock();
    }

    this.removePointerFromCards();

    document.querySelectorAll('.rightAnswer').forEach((item) => item.classList.remove('rightAnswer'));
    document.querySelectorAll('.wrongAnswer').forEach((item) => item.classList.remove('wrongAnswer'));

    const activeAnswer = document.querySelector('.activeAnswer');

    if (activeAnswer) {
      activeAnswer.classList.remove('activeAnswer');
    }
  }

  addPointerOnCards() {
    document.querySelectorAll('.button--rus').forEach((item) => item.classList.add('event-pointer-none'));
  }

  removePointerFromCards() {
    document.querySelectorAll('.button--rus').forEach((item) => item.classList.remove('event-pointer-none'));
  }

  async getInfo() {
    new Audio('/assets/audio/startGame.mp3').play();

    try {
      this.data = await getWordforGame(
        localStorage.getItem('difficultAudioCall'),
        localStorage.getItem('raund'),
        localStorage.getItem('numberOfWords'),
      );

      if (this.data.Error) {
        this.stopLoading();
        throw new Error(this.data.Error);
      }

      this.rusAnswers = this.data.map((item) => item.wordTranslate);

      this.updateButtonsContent();
      this.stopLoading();
    } catch (e) {
      alert(e);
    }
  }

  updateButtonsContent() {
    this.buttonNext.classList.add('event-pointer-none');
    this.wordImage.style.background = `url(https://raw.githubusercontent.com/bobrui4anin/rslang-data/master/${this.data[this.data.length - 1].image})`;
    this.isAnswered = false;
    this.engWord.textContent = this.data[this.data.length - 1].word;
    this.engWord.setAttribute(
      'data-trans',
      this.data[this.data.length - 1].wordTranslate,
    );

    const answersArray = this.rusAnswersSection.querySelectorAll('button');
    const rightWord = this.data[this.data.length - 1].wordTranslate;
    const random = [...this.rusAnswers].sort(() => 0.5 - Math.random()).slice(0, 6);

    // eslint-disable-next-line max-len
    const sortAnsArray = [...new Set([rightWord, ...random])].slice(0, 5).sort(() => Math.random() - 0.5);
    answersArray.forEach((item, index) => {
      const answer = item;
      answer.textContent = sortAnsArray[index];
      answer.setAttribute('data-rus-word', answer.textContent);
    });

    new Audio(`https://raw.githubusercontent.com/bobrui4anin/rslang-data/master/${this.data[this.data.length - 1].audio}`).play();
    this.repeatSoundButton.setAttribute('data-audio-src', this.data[this.data.length - 1].audio);
  }

  getRightAnswer() {
    this.isAnswered = true;
    this.trueAnswers.push(this.data.pop());
    new Audio('/assets/audio/correct.mp3').play();
    document.querySelector(`[data-rus-word='${this.engWord.getAttribute('data-trans')}']`).classList.add('rightAnswer');
  }

  getWrongAnswer() {
    this.isAnswered = true;
    this.wrongAnswers.push(this.data.pop());
    new Audio('/assets/audio/error.mp3').play();
    document.querySelector(`[data-rus-word='${this.engWord.getAttribute('data-trans')}']`).classList.add('wrongAnswer');
  }

  removeGameBlock() {
    const gameBlock = document.querySelector('.game-block');
    if (gameBlock) {
      gameBlock.remove();
    }
  }

  disabelBtnNext() {
    const btnNext = document.querySelector('.button--next');
    if (btnNext) {
      btnNext.classList.add('event-pointer-none');
    }
  }
}

export default new Game();
