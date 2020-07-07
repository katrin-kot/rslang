import createNode from '../../helpers/createNode';
import diffLevel from '../../components/main/difficultOptions/difficultOptions';
import { getWordforGame } from '../../services/userWordService';
import { getUserID } from '../../services/authService';

class Game {
  constructor() {
    this.state = {};
    this.app = document.querySelector('body');
    this.isSoundEnabled = true;
    this.trueAnswers = [];
    this.wrongAnswers = [];
    this.statsForBack = {
      Savanna: {},
    };
    this.keydownListener = '';

    this.appContainer = createNode('div', 'savanna');

    this.app.append(this.appContainer);

    this.topButtonsWrapper = createNode('div', 'wrapper', 'wrapper--top-buttons');

    this.exitButton = createNode('button', 'button', 'button--return');

    this.startContainer = createNode('div', 'container');
    this.title = createNode('h1', 'savanna__title');
    this.title.textContent = 'Саванна';
    this.descriptionGame = createNode('p', 'savanna__description');
    this.descriptionGame.textContent = 'Тренировка Саванна развивает словарный запас. Чем больше слов ты знаешь, тем больше очков опыта получишь';
    this.buttonStartGame = createNode('button', 'button', 'button--start');
    this.buttonStartGame.textContent = 'Начать';
  }

  render() {
    this.topButtonsWrapper.append(this.exitButton);
    this.startContainer.append(this.title, this.descriptionGame, this.buttonStartGame);
    this.appContainer.append(this.topButtonsWrapper, this.startContainer);

    this.startGame();
    this.exitGame();
  }

  startGame() {
    this.buttonStartGame.addEventListener('click', (event) => {
      event.preventDefault();
      this.startContainer.classList.add('hidden');

      this.displayGame();
    });
  }

  exitGame() {
    this.exitButton.addEventListener('click', () => {
      console.log('ПЕРЕХОДИМ НА СТРАНИЦУ ТРЕНИРОВОК');
    });
  }

  displayGame() {
    this.awaitBlock = createNode('div', 'await-block');
    this.keyboardImage = createNode('div', 'await-block__keyboard');
    this.promt = createNode('p', 'await-block__promt');
    this.promt.textContent = 'Используйте клавишы 1, 2, 3 и 4, чтобы дать быстрый ответ';

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

    this.submitButton = createNode('button', 'button', 'form__button', 'button--start');
    this.submitButton.setAttribute('type', 'submit');
    this.submitButton.setAttribute('id', 'submitButton');
    this.submitButton.textContent = 'Продолжить';

    this.form.append(this.inputField, this.selectRound, this.diffLevel, this.submitButton);

    this.awaitBlock.append(this.keyboardImage, this.promt, this.form);
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
      if (!Number.isInteger(Number(this.inputField.value))
      || this.inputField.value > 20
      || this.inputField.value < 5) return this.showError();

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
    this.error.textContent = 'Внимание! Введите число от 5 до 20';
    this.form.prepend(this.error);
    this.inputField.value = '';
  }

  startLoading() {
    new Audio('/assets/audio/startGame.mp3').play();
    this.loading = createNode('div', 'loading');
    this.appContainer.append(this.loading);
  }

  stopLoading() {
    this.loading.remove();
  }

  updateBody() {
    this.soundToggle = createNode('button', 'button', 'button--sound');

    this.soundToggle.addEventListener('click', (event) => {
      event.preventDefault();

      event.target.classList.toggle('sound-disabled');

      this.isSoundEnabled = !this.isSoundEnabled;
    });

    this.lifesWrapper = createNode('div', 'lifes-wrapper');
    for (let i = 0; i < 5; i += 1) {
      const heartIcon = createNode('div', 'heart-icon');
      heartIcon.setAttribute('data-heart', `${i + 1}`);
      this.lifesWrapper.append(heartIcon);
    }

    this.topButtonsWrapper.prepend(this.soundToggle, this.lifesWrapper);

    this.gameBlock = createNode('div', 'game-block');
    this.engWord = createNode('button', 'button', 'button--english');

    this.rusAnswersSection = createNode('div', 'answers-wrapper');
    for (let i = 0; i < 4; i += 1) {
      const answerButton = createNode('button', 'button', 'button--rus');
      answerButton.setAttribute('data-answer', `${i + 1}`);
      this.rusAnswersSection.append(answerButton);
    }

    this.gameBlock.append(this.engWord, this.rusAnswersSection);
    this.appContainer.append(this.gameBlock);

    const clickListener = (event) => {
      event.preventDefault();

      if (event.target.tagName !== 'BUTTON') return;
      if (event.target.textContent === this.engWord.getAttribute('data-trans')) {
        this.getRightAnswer();
      } else {
        this.getWrongAnswer();
      }
    };

    this.rusAnswersSection.addEventListener('click', clickListener);

    this.keydownListener = (event) => {
      event.preventDefault();

      const answers = this.rusAnswersSection.querySelectorAll('button');

      if (event.code === 'Digit1' || event.code === 'Numpad1') {
        if (answers[0].textContent === this.engWord.getAttribute('data-trans')) {
          this.getRightAnswer();
        } else {
          this.getWrongAnswer();
        }
      }

      if (event.code === 'Digit2' || event.code === 'Numpad2') {
        if (answers[1].textContent === this.engWord.getAttribute('data-trans')) {
          this.getRightAnswer();
        } else {
          this.getWrongAnswer();
        }
      }

      if (event.code === 'Digit3' || event.code === 'Numpad3') {
        if (answers[2].textContent === this.engWord.getAttribute('data-trans')) {
          this.getRightAnswer();
        } else {
          this.getWrongAnswer();
        }
      }

      if (event.code === 'Digit4' || event.code === 'Numpad4') {
        if (answers[3].textContent === this.engWord.getAttribute('data-trans')) {
          this.getRightAnswer();
        } else {
          this.getWrongAnswer();
        }
      }
    };

    this.app.addEventListener('keydown', this.keydownListener);
  }

  async getInfo(numberOfWords, roundNumber) {
    this.numberOfWords = numberOfWords;
    try {
      this.data = await getWordforGame(getUserID(), localStorage.getItem('difficultSprint'), numberOfWords, roundNumber);
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
    this.engWord.classList.add('dropped');
    const timer = setTimeout(() => {
      this.engWord.classList.remove('dropped');
      this.getWrongAnswer();
    }, 5000);

    this.state.currentTimerId = timer;

    this.engWord.textContent = this.data[this.data.length - 1].word;
    this.engWord.setAttribute('data-trans', this.data[this.data.length - 1].wordTranslate);

    const answersArray = this.rusAnswersSection.querySelectorAll('button');
    const answerWords = [];

    let dataLength = this.data.length - 1;

    for (let i = 0; i < 4; i += 1) {
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
  }

  getRightAnswer() {
    clearTimeout(this.state.currentTimerId);
    this.engWord.classList.remove('dropped');
    this.trueAnswers.push(this.data.pop());
    if (this.isSoundEnabled) new Audio('/assets/audio/correct.mp3').play();
    if (this.data.length === 0) return setTimeout(() => this.showResults(), 1500);
    return setTimeout(() => this.updateButtonsContent(), 1000);
  }

  getWrongAnswer() {
    clearTimeout(this.state.currentTimerId);
    this.engWord.classList.remove('dropped');
    this.wrongAnswers.push(this.data.pop());
    if (this.isSoundEnabled) new Audio('/assets/audio/error.mp3').play();
    this.lifesWrapper.querySelector('.heart-icon').classList.add('heart-icon--disabled');
    this.lifesWrapper.querySelector('.heart-icon').classList.remove('heart-icon');
    const lostLifes = this.lifesWrapper.querySelectorAll('.heart-icon');
    if (lostLifes.length === 0
      || this.data.length === 0) return setTimeout(() => this.showResults(), 1500);
    return setTimeout(() => this.updateButtonsContent(), 1000);
  }

  showResults() {
    new Audio('/assets/audio/endGame.mp3').play();
    this.appContainer.innerHTML = '';
    this.resModal = createNode('div', 'game-results');
    this.resText = createNode('p', 'game-results__text');

    if (this.wrongAnswers.length === 0) {
      this.resText.textContent = 'Молодец! Отличный результат!';
    } else if (this.wrongAnswers.length < 4) {
      this.resText.textContent = 'Неплохо, но есть над чем поработать';
    } else this.resText.textContent = 'Слабо! Попробуй еще раз!';

    this.resLink = createNode('p', 'game-results__result');

    if (this.wrongAnswers.length === 0) {
      this.resLink.textContent = `${this.trueAnswers.length} слов изучено, ${this.wrongAnswers.length} слов на изучении`;
    } else if (this.wrongAnswers.length === 1) {
      this.resLink.textContent = `${this.trueAnswers.length} слов изучено, ${this.wrongAnswers.length} слово на изучении`;
    } else if (this.wrongAnswers.length < 5) {
      this.resLink.textContent = `${this.trueAnswers.length} слов изучено, ${this.wrongAnswers.length} слова на изучении`;
    } else this.resLink.textContent = `${this.trueAnswers.length} слова изучено, ${this.wrongAnswers.length} слов на изучении`;

    this.resDescContainer = createNode('div', 'game-results__description');

    this.resultsRightContainer = createNode('div', 'game-results__right-block');

    this.resRightTitle = createNode('p', 'block-title', 'block-title--right');
    this.resRightTitle.textContent = `Знаю: ${this.trueAnswers.length}`;

    this.resultsRightContainer.append(this.resRightTitle);

    if (this.trueAnswers.length !== 0) {
      this.trueAnswers.map((item) => {
        this.resultsRightContainer.innerHTML += `
        <div class="answer">
          <span class="answer__sound"></span>
          <p class="answer__text">${item.word}  -  ${item.wordTranslate}</p>
          <audio src="https://raw.githubusercontent.com/bobrui4anin/rslang-data/master/${item.audio}" preload="none"></audio>
        </div>`;
        return this.trueAnswers;
      });
    }

    this.resultsWrongContainer = createNode('div', 'game-results__wrong-block');

    this.resWrongTitle = createNode('p', 'block-title', 'block-title--wrong');
    this.resWrongTitle.textContent = `Ошибок: ${this.wrongAnswers.length}`;

    this.resultsWrongContainer.append(this.resWrongTitle);

    if (this.wrongAnswers.length !== 0) {
      this.wrongAnswers.map((item) => {
        this.resultsWrongContainer.innerHTML += `
        <div class="answer">
          <span class="answer__sound"></span>
          <p class="answer__text">${item.word}  -  ${item.wordTranslate}</p>
          <audio src="https://raw.githubusercontent.com/bobrui4anin/rslang-data/master/${item.audio}" preload="none"></audio>
        </div>`;
        return this.wrongAnswers;
      });
    }

    this.resDescContainer.append(this.resultsRightContainer, this.resultsWrongContainer);

    this.tryAgain = createNode('p', 'game-results__try');
    this.tryAgain.textContent = 'Продолжить тренировку';

    this.backToTrain = createNode('p', 'game-results__back');
    this.backToTrain.textContent = 'К списку тренировок';

    this.resModal.append(this.resText, this.resLink);
    this.resModal.append(this.resDescContainer, this.tryAgain, this.backToTrain);

    this.appContainer.append(this.resModal);

    this.resultsListener();
    this.playAudioResults();

    this.getStatsInfo();
  }

  resultsListener() {
    this.appContainer.addEventListener('click', (event) => {
      event.preventDefault();

      if (event.target.tagName !== 'P') return;

      if (event.target === this.resLink) {
        this.resDescContainer.classList.toggle('game-results__description--click');
      }

      if (event.target === this.tryAgain) {
        const oldContainer = this.rusAnswersSection;
        const container = oldContainer.cloneNode(true);
        oldContainer.parentNode.replaceChild(container, oldContainer);

        this.app.removeEventListener('keydown', this.keydownListener, false);
        this.app.innerHTML = '';
        this.appContainer = createNode('div', 'savanna');
        this.app.append(this.appContainer);

        this.topButtonsWrapper = createNode('div', 'wrapper', 'wrapper--top-buttons');

        this.exitButton = createNode('button', 'button', 'button--return');
        this.topButtonsWrapper.append(this.exitButton);
        this.appContainer.append(this.topButtonsWrapper);

        this.exitGame();
        this.startLoading();
        this.updateBody();
        this.isSoundEnabled = true;
        this.trueAnswers = [];
        this.wrongAnswers = [];

        localStorage.setItem('round', Number(localStorage.getItem('round')) + 1);

        if (Number(localStorage.getItem('round')) === 30) {
          localStorage.setItem('round', 0);
          localStorage.setItem('difficultSprint', Number(localStorage.getItem('difficultSprint')) + 1);

          if (Number(localStorage.getItem('difficultSprint')) === 6) {
            localStorage.setItem('difficultSprint', 0);
          }
        }

        this.getInfo(Number(localStorage.getItem('numberOfWords')), Number(localStorage.getItem('round')));
      }

      if (event.target === this.backToAnotherTrain) {
        console.log('ПЕРЕХОДИМ НА СТРАНИЦУ ТРЕНИРОВОК');
      }
    });
  }

  playAudioResults() {
    this.resDescContainer.addEventListener('click', (event) => {
      if (event.target.classList.value !== 'answer__sound') return;

      event.target.closest('div').querySelector('audio').play();
    });
  }

  getStatsInfo() {
    const date = new Date();
    const day = `0${date.getDate()}`;
    const month = `0${date.getMonth() + 1}`;
    const year = date.getFullYear();
    const hour = date.getHours();
    const min = `0${date.getMinutes()}`;
    const sec = `0${date.getSeconds()}`;

    const fullDate = `${day.substr(-2)}.${month.substr(-2)}.${year}T${hour}:${min.substr(-2)}:${sec.substr(-2)}`;
    const res = `${this.trueAnswers.length}-${this.wrongAnswers.length}`;

    this.statsForBack.Savanna[`${fullDate}`] = res;

    const state = this.statsForBack;
    console.log(state);
  }
}

export default new Game();
