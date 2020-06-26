/* eslint-disable no-unused-vars */
// for settings variables
const fontSize = 26;
const letterLength = fontSize * 0.7;


const wordSetting = true;
const imageSetting = true;
const audioSetting = true;
const audioMeaningSetting = true;
const audioExampleSetting = true;
const textMeaningSetting = true;
const textExampleSetting = true;
const transcriptionSetting = true;
const textExampleTranslateSetting = true;
const textMeaningTranslateSetting = true;
const wordTranslateSetting = true;

export default class Card {
  constructor({
    id, group, page, word, image, audio, audioMeaning, audioExample, textMeaning, textExample,
    transcription, textExampleTranslate, textMeaningTranslate, wordTranslate,
    wordsPerExampleSentence,
  }) {
    this.id = id;
    this.group = group;
    this.page = page;
    this.word = word;
    this.image = image;
    this.audio = audio;
    this.audioMeaning = audioMeaning;
    this.audioExample = audioExample;
    this.textMeaning = textMeaning;
    this.textExample = textExample;
    this.transcription = transcription;
    this.textExampleTranslate = textExampleTranslate;
    this.textMeaningTranslate = textMeaningTranslate;
    this.wordTranslate = wordTranslate;
    this.wordsPerExampleSentence = wordsPerExampleSentence;
  }

  static createCard() {
    const card = document.createElement('div');
    card.classList.add('game-card');
    return card;
  }

  createWord() {
    return `<div class="word zero-opacity">${this.word}</div>`;
  }

  createWordTranslate() {
    return `<div class="word-translate"><span>${this.wordTranslate}</span></div>`;
  }

  createTextMeaning() {
    const example = this.textMeaning.split(`<i>${this.word}</i>`);
    const meaningExample = `<div class="text-meaning"><span>${example[0]}</span><input type="text" class="meaning-input" style="width:${this.word.length * letterLength}px" disabled><span>${example[1]}</span></div>`;
    return meaningExample;
  }

  createTextMeaningTranslate() {
    return `<div class="text-meaning-translate zero-opacity">${this.textMeaningTranslate}</div>`;
  }

  createWordInput() {
    return `<span style="position:relative"><input type="text" class="word-input" id="word-input" style="width:${this.word.length * letterLength}px" autofocus>
    <label for "word-input" id="word-check"></label></span>`;
  }

  createTextExample() {
    const example = this.textExample.split(`<b>${this.word}</b>`);
    const textExample = `<div><span>${example[0]}</span>${this.createWordInput()}<span>${example[1]}</span></div>`;
    return textExample;
  }

  createTextExampleTranslate() {
    return `<div class="text-example-translate zero-opacity">${this.textExampleTranslate}</div>`;
  }

  createTranscription() {
    return `<div class="transcription zero-opacity">${this.transcription}</div>`;
  }

  createImage() {
    return `<div><img class="image" src="https://raw.githubusercontent.com/bobrui4anin/rslang-data/master/${this.image}" alt="word-image"</div>`;
  }

  createAudio() {
    return `<audio class="audio" src="https://raw.githubusercontent.com/bobrui4anin/rslang-data/master/${this.audio}"></audio>`;
  }

  createAudioMeaning() {
    return `<audio class="audio" src="https://raw.githubusercontent.com/bobrui4anin/rslang-data/master/${this.audioMeaning}"></audio>`;
  }

  createAudioExample() {
    return `<audio class="audio" src="https://raw.githubusercontent.com/bobrui4anin/rslang-data/master/${this.audioExample}"></audio>`;
  }

  renderCard() {
    const card = Card.createCard();
    let template = '';
    if (imageSetting) template += this.createImage();
    template += this.createWord();
    template += this.createTranscription();
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
    card.innerHTML = template;
    document.body.append(card);
    document.querySelector('.word-input').addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        this.renderWordSpelling();
        // вынести в метод
        document.querySelectorAll('.zero-opacity').forEach((el) => {
          el.classList.remove('zero-opacity');
        });
        document.querySelector('.meaning-input').value = this.word;
      }
    });
  }

  checkWord() {
    const input = document.querySelector('.word-input');
    let template = '';
    const { value } = input;
    const valueArr = value.split('');
    const wordArr = this.word.split('');

    const countErrors = () => {
      let errorCount = 0;
      valueArr.forEach((el, i) => {
        if (el !== this.word[i]) {
          errorCount += 1;
        }
      });
      let color = 'color-error-';
      if (errorCount < this.word.length / 2) {
        color += 'few';
      } else {
        color += 'many';
      }
      return color;
    };
    const errorColor = countErrors();

    wordArr.forEach((el, i) => {
      if (el === valueArr[i]) {
        template += `<span class="color-correct">${el}</span>`;
      } else {
        template += `<span class="${errorColor}">${el}</span>`;
      }
    });
    return template;
  }

  renderWordSpelling() {
    const word = this.checkWord();
    const wordContainer = document.querySelector('#word-check');
    document.querySelector('.word-input').value = '';
    wordContainer.innerHTML = word;
  }
}
