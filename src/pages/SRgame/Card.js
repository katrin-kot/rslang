import { createElement } from './helpers';
import swiper from './swiper';
import {
  imageSetting,
  audioSetting,
  audioMeaningSetting,
  audioExampleSetting,
  textMeaningSetting,
  textExampleSetting,
  transcriptionSetting,
  wordTranslateSetting,

  showAnswerBtnSetting,
  addToHardBtnSetting,
  deleteWordBtnSetting,

  difficultyBtnsSetting,
} from './settings';

const fontSize = 16;
const letterLength = fontSize * 0.7;


export default class Card {
  constructor({ ...wordCard }) {
    this.wordCard = wordCard;

    this.showAnswerBtn = createElement('button', 'show-answer-btn', 'Показать ответ');
    this.addToHardBtn = createElement('button', 'add-to-hard-btn', '+ Сложные');
    this.deleteWordBtn = createElement('button', 'delete-word-btn', 'Удалить');

    this.againBtn = createElement('button', 'again-btn zero-opacity', 'Снова');
    this.easyBtn = createElement('button', 'easy-btn zero-opacity', 'Легко');
    this.goodBtn = createElement('button', 'good-btn zero-opacity', 'Нормально');
    this.hardBtn = createElement('button', 'hard-btn zero-opacity', 'Сложно');

    this.againBtn.addEventListener('click', () => {
      const card = new Card(this.wordCard);
      swiper.appendSlide(card.renderCard());
    });
    this.error = 0;
    this.container = createElement('div', 'card-container swiper-slide');
  }

  static createCard() {
    const card = createElement('div', 'game-card');
    return card;
  }

  createWord() {
    return `<div class="word zero-opacity">${this.wordCard.word}</div>`;
  }

  createWordTranslate() {
    return `<div class="word-translate"><span>${this.wordCard.wordTranslate}</span></div>`;
  }

  createTextMeaning() {
    const tagExp = new RegExp('<s*i[^>]*>(.*?)<s*/s*i>');
    const example = this.wordCard.textMeaning.split(tagExp);
    const meaningExample = `<div class="text-meaning"><span>${example[0]}</span><input type="text" class="meaning-input" data-word="${example[1]}" 
    style="width:${this.wordCard.word.length * letterLength}px" disabled><span>${example[2]}</span></div>`;
    return meaningExample;
  }

  createTextMeaningTranslate() {
    const display = (this.translationMode === 'off') ? 'display-none' : '';
    return `<div class="text-meaning-translate zero-opacity translation ${display}">${this.wordCard.textMeaningTranslate}</div>`;
  }

  createWordInput() {
    return `<div><span style="position:relative"><input type="text" class="word-input" data-word="${this.wordCard.word}"
    style="width:${this.wordCard.word.length * letterLength}px" autofocus>
    <label for "word-input" class="word-check" id="${this.wordCard.word}-check"></label></span></div>`;
  }

  createTextExample() {
    const tagExp = new RegExp('<s*b[^>]*>(.*?)<s*/s*b>');
    const example = this.wordCard.textExample.split(tagExp);
    const textExample = `<div><span>${example[0]}</span><input type="text" class="example-input" data-word="${example[1]}"
    style="width:${this.wordCard.word.length * letterLength}px" disabled><span>${example[2]}</span></div>`;
    return textExample;
  }

  createTextExampleTranslate() {
    return `<div class="text-example-translate zero-opacity translation">${this.wordCard.textExampleTranslate}</div>`;
  }

  createTranscription() {
    return `<div class="transcription zero-opacity">${this.wordCard.transcription}</div>`;
  }

  createImage() {
    return `<div><img class="image" src="https://raw.githubusercontent.com/bobrui4anin/rslang-data/master/${this.wordCard.image}" alt="word-image"</div>`;
  }

  createAudio() {
    return `<audio class="audio" src="https://raw.githubusercontent.com/bobrui4anin/rslang-data/master/${this.wordCard.audio}"></audio>`;
  }

  createAudioMeaning() {
    return `<audio class="audio" src="https://raw.githubusercontent.com/bobrui4anin/rslang-data/master/${this.wordCard.audioMeaning}"></audio>`;
  }

  createAudioExample() {
    return `<audio class="audio" src="https://raw.githubusercontent.com/bobrui4anin/rslang-data/master/${this.wordCard.audioExample}"></audio>`;
  }

  renderCard() {
    const card = Card.createCard();
    let template = '';

    if (imageSetting) template += this.createImage();
    template += this.createWordInput();

    if (transcriptionSetting) template += this.createTranscription();
    if (textExampleSetting) {
      template += this.createTextExample();
      template += this.createTextExampleTranslate();
    } else {
      template += this.createWordInput();
    }
    if (wordTranslateSetting) template += this.createWordTranslate();
    if (textMeaningSetting) {
      template += this.createTextMeaning();
      template += this.createTextMeaningTranslate();
    }
    if (audioSetting) template += this.createAudio();
    if (audioExampleSetting) template += this.createAudioExample();
    if (audioMeaningSetting) template += this.createAudioMeaning();

    card.innerHTML = template;


    // eslint-disable-next-line no-underscore-dangle
    this.container.dataset.id = this.wordCard._id;
    this.container.append(card);

    const cardsBtns = createElement('div', 'card-btns');
    if (showAnswerBtnSetting) cardsBtns.append(this.showAnswerBtn);
    if (addToHardBtnSetting) cardsBtns.append(this.addToHardBtn);
    if (deleteWordBtnSetting) cardsBtns.append(this.deleteWordBtn);
    card.append(cardsBtns);


    if (difficultyBtnsSetting) {
      const difficultyBtnsContainer = createElement('div', 'difficulty-btns');

      difficultyBtnsContainer.append(this.againBtn);
      difficultyBtnsContainer.append(this.easyBtn);
      difficultyBtnsContainer.append(this.goodBtn);
      difficultyBtnsContainer.append(this.hardBtn);

      this.container.append(difficultyBtnsContainer);
    }

    return this.container;
  }

  addErrorsObserver() {
    const target = this.container;
    const config = {
      attributes: true,
      attributeFilter: ['data-errors'],
    };
    const mCallback = (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          this.error = target.dataset.errors;
          const card = new Card(this.wordCard);
          swiper.appendSlide(card.renderCard());
        }
      });
    };
    const observer = new MutationObserver(mCallback);
    observer.observe(target, config);
  }
}
