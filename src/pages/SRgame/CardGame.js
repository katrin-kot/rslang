import NewCard from './NewCard';
import LearningCard from './LearningCard';
import swiper from './swiper';
import { getNewWords, filterLearningWordsPerDate } from '../../services/SRgameWordsService';
import { countErrors, createElement } from './helpers';

export default class CardGame {
  constructor() {
    this.rightAnswers = 0;
    this.rightAnswersSeries = 0;
    this.rightAnswersSeriesArr = [];
    this.newCards = [];
    this.learningCards = [];
  }

  async createCardsForNewCardGame() {
    const cards = await getNewWords();
    cards.forEach((word) => {
      this.newCards.push(new NewCard(word));
    });
  }

  async createCardsForLearningCardGame() {
    let cards = await filterLearningWordsPerDate();
    cards = cards.slice(0, 3);
    cards.forEach((word) => {
      this.learningCards.push(new LearningCard(word));
    });
  }

  async renderGame(cards) {
    document.body.append(CardGame.createAudioControl('on'));
    document.body.append(CardGame.createTranslationControl('on'));
    swiper.allowSlideNext = false;
    CardGame.addAudioControl();
    CardGame.addTranslationControl();
    cards.forEach((card) => {
      if (!this.errors) swiper.appendSlide(card.renderCard());
      card.addErrorsObserver();
      card.addSettings();
    });
    this.addControl();
    this.endGame(cards);
  }

  async renderGameLearningCards() {
    await this.createCardsForLearningCardGame();
    this.renderGame(this.learningCards);
  }

  async renderGameNewCards() {
    await this.createCardsForNewCardGame();
    this.renderGame(this.newCards);
  }

  static createAudioControl(mode) {
    const audioControl = createElement('div');
    audioControl.setAttribute('id', 'audio-control');
    if (mode === 'on') {
      audioControl.classList.add('sound-on');
      audioControl.dataset.soundMode = 'on';
    } else if (mode === 'off') {
      audioControl.classList.add('sound-off');
      audioControl.dataset.soundMode = 'off';
    }
    return audioControl;
  }

  static addAudioControl() {
    const audioControl = document.querySelector('#audio-control');
    audioControl.addEventListener('click', () => {
      if (audioControl.dataset.soundMode === 'on') {
        audioControl.dataset.soundMode = 'off';
        audioControl.classList.remove('sound-on');
        audioControl.classList.add('sound-off');
        document.querySelectorAll('.swiper-slide-active audio').forEach((audio) => {
          audio.pause();
        });
      } else if (audioControl.dataset.soundMode === 'off') {
        audioControl.dataset.soundMode = 'on';
        audioControl.classList.remove('sound-off');
        audioControl.classList.add('sound-on');
      }
    });
  }

  static playAudio() {
    const audios = document.querySelectorAll('.swiper-slide-active audio');
    const audioControl = document.querySelector('#audio-control');
    if (audioControl.dataset.soundMode === 'on') {
      for (let i = 0; i < audios.length; i += 1) {
        if (i === 0) {
          audios[i].play();
        } else {
          audios[i - 1].addEventListener('ended', () => {
            audios[i].play();
          });
        }
      }
    }
  }

  static createTranslationControl(mode) {
    const translationControl = createElement('div');
    translationControl.setAttribute('id', 'translation-control');
    if (mode === 'on') {
      translationControl.classList.add('translation-on');
      translationControl.dataset.translationMode = 'on';
    } else if (mode === 'off') {
      translationControl.classList.add('translation-off');
      translationControl.dataset.translationMode = 'off';
    }
    return translationControl;
  }

  static addTranslationControl() {
    const translationControl = document.querySelector('#translation-control');
    translationControl.addEventListener('click', () => {
      if (translationControl.dataset.translationMode === 'on') {
        translationControl.dataset.translationMode = 'off';
        translationControl.classList.remove('translation-on');
        translationControl.classList.add('translation-off');
      } else if (translationControl.dataset.translationMode === 'off') {
        translationControl.dataset.translationMode = 'on';
        translationControl.classList.remove('translation-off');
        translationControl.classList.add('translation-on');
      }
      document.querySelectorAll('.translation').forEach((el) => {
        if (el.classList.contains('display-none')) {
          el.classList.remove('display-none');
        } else {
          el.classList.add('display-none');
        }
      });
    });
  }

  countGameErrors(input) {
    const { value } = input;
    if (value === input.dataset.word) {
      this.rightAnswers += 1;
      this.rightAnswersSeries += 1;
      this.rightAnswersSeriesArr.push(this.rightAnswersSeries);
    } else if (value !== input.dataset.word) {
      this.rightAnswersSeries = 0;
    }
  }

  static addInputHandler(input) {
    const { value } = input;
    const { word } = input.dataset;
    this.renderWordSpelling(word, value);

    const setInput = () => {
      if (value === input.dataset.word) {
        input.setAttribute('disabled', 'disabled');
        swiper.allowSlideNext = true;
        setTimeout(() => {
          swiper.slideNext();
          swiper.allowSlideNext = false;
        }, 1000);
      } else if (value !== input.dataset.word) {
        if (!document.querySelector('.swiper-slide-active.card-container').dataset.errors) {
          document.querySelector('.swiper-slide-active.card-container').dataset.errors = 1;
        }
        document.querySelectorAll(`.swiper-slide-active #${input.dataset.word}-check span`).forEach((span) => {
          span.classList.add('translucent');
        });
      }
    };
    if (value !== input.dataset.word) {
      document.querySelector('.swiper-slide-active .word-input').value = '';
    }

    setTimeout(() => { setInput(); }, 2000);

    document.querySelector('.swiper-slide-active .meaning-input').value = document.querySelector('.swiper-slide-active .meaning-input').dataset.word;
    document.querySelector('.swiper-slide-active .example-input').value = document.querySelector('.swiper-slide-active .example-input').dataset.word;

    document.querySelector('.swiper-slide-active .word-input').addEventListener('input', () => {
      document.querySelector(`#${input.dataset.word}-check`).innerHTML = '';
    });
  }

  static checkWordSpelling(word, value) {
    let template = '';
    const valueArr = value.split('');
    const wordArr = word.split('');
    const errorColor = countErrors(word, value);
    wordArr.forEach((el, i) => {
      if (el === valueArr[i]) {
        template += `<span class="color-correct">${el}</span>`;
      } else {
        template += `<span class="${errorColor}">${el}</span>`;
      }
    });
    return template;
  }

  static renderWordSpelling(word, value) {
    const checkedWord = this.checkWordSpelling(word, value);
    const wordContainer = document.querySelector(`.swiper-slide-active #${word}-check`);
    if (wordContainer) wordContainer.innerHTML = checkedWord;
  }

  addControl() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        if (e.target.classList.contains('word-input') && e.target.closest('.card-container').classList.contains('swiper-slide-active')) {
          e.preventDefault();
          CardGame.addInputHandler(e.target);
          this.countGameErrors(e.target);
          document.querySelectorAll('.swiper-slide-active .zero-opacity').forEach((el) => {
            el.classList.remove('zero-opacity');
          });
          CardGame.playAudio();
        }
      }
    });

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('show-answer-btn')) {
        const input = document.querySelector('.swiper-slide-active .word-input');
        input.value = input.dataset.word;
        input.setAttribute('disabled', 'disabled');
        document.querySelector('.swiper-slide-active .meaning-input').value = document.querySelector('.swiper-slide-active .meaning-input').dataset.word;
        document.querySelector('.swiper-slide-active .example-input').value = document.querySelector('.swiper-slide-active .example-input').dataset.word;
        document.querySelectorAll('.swiper-slide-active .zero-opacity').forEach((el) => {
          el.classList.remove('zero-opacity');
        });
        swiper.allowSlideNext = true;
        setTimeout(() => {
          swiper.slideNext();
          swiper.allowSlideNext = false;
        }, 1000);
        this.rightAnswersSeries = 0;
      }
    });

    document.querySelector('.swiper-button-next').addEventListener('click', () => {
      CardGame.addInputHandler(document.querySelector('.swiper-slide-active .word-input'));
      this.countGameErrors(document.querySelector('.swiper-slide-active .word-input'));
      document.querySelectorAll('.swiper-slide-active .zero-opacity').forEach((el) => {
        el.classList.remove('zero-opacity');
      });
      CardGame.playAudio();
    });

    swiper.on('slideChange', () => {
      document.querySelectorAll('.swiper-slide-active audio').forEach((audio) => {
        audio.pause();
      });
    });
  }

  async endGame(cards) {
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        if (swiper.activeIndex === document.querySelectorAll('.swiper-slide').length - 1) {
          cards.forEach(async (card) => {
            await card.createUserCard();
          });
        }
      }
    });
  }
}
