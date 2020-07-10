/* eslint-disable no-param-reassign */
import './audioCall.css';

import createNode from '../../helpers/createNode';
import diffLevel from '../../components/main/difficultOptions/difficultOptions';
import { getWordforGame } from '../../services/userWordService';
import { getUserID } from '../../services/authService';
import { checkUserLogin } from '../../services/verifyUserService';

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

    this.exitButton = createNode('button', 'button', 'button--return');

    this.app.append(this.appContainer);
  }

  async render() {
    this.startLoading();
    await checkUserLogin();
    this.startPage.append(this.startPageTitle, this.startPageDescription, this.startPageButton);
    this.appContainer.append(this.exitButton, this.startPage);

    this.startGame();
    this.exitGame();
    this.stopLoading();
  }

  startLoading() {
    this.loading = createNode('div', 'loading');
    this.appContainer.append(this.loading);
  }

  stopLoading() {
    this.loading.remove();
  }

  exitGame() {
    this.exitButton.addEventListener('click', () => {
      console.log('ПЕРЕХОДИМ НА СТРАНИЦУ ТРЕНИРОВОК');
    });
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

    this.form = createNode('form', 'await-block__form');

    this.inputField = createNode('input', 'form__input');
    this.inputField.setAttribute('placeholder', 'Введите количество слов');
    this.inputField.setAttribute('required', 'true');

    this.selectRound = createNode('input', 'form__round');
    this.selectRound.setAttribute('type', 'number');
    this.selectRound.setAttribute('min', '0');
    this.selectRound.setAttribute('max', '29');
    this.selectRound.setAttribute('required', 'true');

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
      this.selectRound,
      this.diffLevel,
      this.submitButton,
    );

    this.awaitBlock.append(this.form);
    this.appContainer.append(this.awaitBlock);

    this.form.addEventListener('click', () => {
      const inputElements = this.form.querySelectorAll('input[type="radio"]');
      inputElements.forEach((item) => {
        if (item.checked) {
          localStorage.setItem('difficultSprint', item.value);
        }
      });
    });
    this.continueListener();
  }

  continueListener() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (this.error) this.error.remove();
      if (
        !Number.isInteger(Number(this.inputField.value))
        || this.inputField.value > 20
        || this.inputField.value < 10
      ) return this.showError();

      this.awaitBlock.classList.add('hidden');
      this.startLoading();
      this.updateBody();
      localStorage.setItem('numberOfWords', this.inputField.value);
      localStorage.setItem('round', this.selectRound.value);
      return this.getInfo(this.inputField.value, this.selectRound.value);
    });
  }

  showError() {
    this.error = createNode('p', 'form__error');
    this.error.textContent = 'Внимание! Введите число от 10 до 20';
    this.form.prepend(this.error);
    this.inputField.value = '';
  }

  updateBody() {
    this.gameBlock = createNode('div', 'game-block');

    this.engTopBlock = createNode('div', 'game-block__question');

    this.wordImage = createNode('div', 'game-block__image');

    this.repeatSoundButton = createNode('button', 'button', 'button--repeat');
    this.repeatSoundButton.textContent = 'Прослушать слово';

    this.engWord = createNode('button', 'button', 'button--english');

    this.engTopBlock.append(this.wordImage, this.repeatSoundButton, this.engWord);

    this.rusAnswersSection = createNode('div', 'answers-wrapper');
    for (let i = 0; i < 5; i += 1) {
      const answerButton = createNode('button', 'button', 'button--rus');
      answerButton.setAttribute('data-answer', `${i + 1}`);
      this.rusAnswersSection.append(answerButton);
    }

    this.buttonNext = createNode('button', 'button', 'button--next');
    this.buttonNext.textContent = 'Не знаю';

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
      this.buttonNext.classList.add('button--arrow');
    };

    this.rusAnswersSection.addEventListener('click', clickListener);

    this.repeatSoundButton.addEventListener('click', (event) => {
      event.preventDefault();

      new Audio(`https://raw.githubusercontent.com/bobrui4anin/rslang-data/master/${this.data[this.data.length - 1].audio}`).play();
    });

    this.buttonNext.addEventListener('click', (event) => {
      event.preventDefault();
      this.buttonNext.classList.add('button--arrow');
      if (!this.isAnswered) {
        //this.showAnswer();
        this.getWrongAnswer();
        setTimeout(() => this.updateButtonsContent(), 1500);
      } else {
        setTimeout(() => this.updateButtonsContent(), 500);
      }
    });
  }

  async getInfo(numberOfWords, roundNumber) {
    new Audio('/assets/audio/startGame.mp3').play();
    this.numberOfWords = numberOfWords;
    try {
      this.data = await getWordforGame(
        getUserID(),
        localStorage.getItem('difficultSprint'),
        numberOfWords,
        roundNumber,
      );
      if (this.data.Error) {
        this.stopLoading();
        throw new Error(this.data.Error);
      }

      this.rusAnswers = [];

      this.data.forEach((item) => {
        this.rusAnswers.push(item.wordTranslate);
      });

      this.updateButtonsContent();
      this.stopLoading();
    } catch (e) {
      alert(e);
    }
  }

  updateButtonsContent() {
    if (this.buttonNext.classList.contains('button--arrow')) {
      this.buttonNext.classList.remove('button--arrow');
    }
    this.wordImage.style.background = `url(https://raw.githubusercontent.com/bobrui4anin/rslang-data/master/${this.data[this.data.length - 1].image})`;
    this.isAnswered = false;
    this.engWord.textContent = this.data[this.data.length - 1].word;
    this.engWord.setAttribute(
      'data-trans',
      this.data[this.data.length - 1].wordTranslate,
    );

    const answersArray = this.rusAnswersSection.querySelectorAll('button');
    const answerWords = [];

    let dataLength = this.data.length - 1;

    for (let i = 0; i < 7; i += 1) {
      if (dataLength - i < 0) {
        dataLength = this.data.length + i + 1;
      }
      answerWords.push(this.rusAnswers[dataLength - i]);
    }

    const sortAnsArray = answerWords.sort(() => Math.random() - 0.5);

    answersArray.forEach((item, index) => {
      const answer = item;
      answer.textContent = sortAnsArray[index];
    });

    new Audio(`https://raw.githubusercontent.com/bobrui4anin/rslang-data/master/${this.data[this.data.length - 1].audio}`).play();
  }

  getRightAnswer() {
    this.isAnswered = true;
    this.trueAnswers.push(this.data.pop());
    new Audio('/assets/audio/correct.mp3').play();
    if (this.data.length === 0) setTimeout(() => this.showResults(), 1500);
  }

  getWrongAnswer() {
    this.isAnswered = true;
    this.wrongAnswers.push(this.data.pop());
    new Audio('/assets/audio/error.mp3').play();
    if (this.data.length === 0) setTimeout(() => this.showResults(), 1500);
  }
}

export default new Game();
