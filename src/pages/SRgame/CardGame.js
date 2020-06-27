import Card from './Card';
import swiper from './swiper';
import { countErrors, createElement } from './helpers';

const wordsExample = [
  {
    id: '5e9f5ee35eb9e72bc21af4a1',
    group: 0,
    page: 0,
    word: 'agree',
    image: 'files/01_0001.jpg',
    audio: 'files/01_0001.mp3',
    audioMeaning: 'files/01_0001_meaning.mp3',
    audioExample: 'files/01_0001_example.mp3',
    textMeaning: 'To <i>agree</i> is to have the same opinion or belief as another person.',
    textExample: 'The students <b>agree</b> they have too much homework.',
    transcription: '[əgríː]',
    textExampleTranslate: 'Студенты согласны, что у них слишком много домашней работы',
    textMeaningTranslate: 'Согласиться - значит иметь то же мнение или убеждение, что и другой человек',
    wordTranslate: 'согласна',
    wordsPerExampleSentence: 8,
  },
  {
    id: '5e9f5ee35eb9e72bc21af4a0',
    group: 0,
    page: 0,
    word: 'alcohol',
    image: 'files/01_0002.jpg',
    audio: 'files/01_0002.mp3',
    audioMeaning: 'files/01_0002_meaning.mp3',
    audioExample: 'files/01_0002_example.mp3',
    textMeaning: '<i>Alcohol</i> is a type of drink that can make people drunk.',
    textExample: 'A person should not drive a car after he or she has been drinking <b>alcohol</b>.',
    transcription: '[ǽlkəhɔ̀ːl]',
    textExampleTranslate: 'Человек не должен водить машину после того, как он выпил алкоголь',
    textMeaningTranslate: 'Алкоголь - это тип напитка, который может сделать людей пьяными',
    wordTranslate: 'алкоголь',
    wordsPerExampleSentence: 15,
  },
  {
    id: '5e9f5ee35eb9e72bc21af4a2',
    group: 0,
    page: 0,
    word: 'boat',
    image: 'files/01_0005.jpg',
    audio: 'files/01_0005.mp3',
    audioMeaning: 'files/01_0005_meaning.mp3',
    audioExample: 'files/01_0005_example.mp3',
    textMeaning: 'A <i>boat</i> is a vehicle that moves across water.',
    textExample: 'There is a small <b>boat</b> on the lake.',
    transcription: '[bout]',
    textExampleTranslate: 'На озере есть маленькая лодка',
    textMeaningTranslate: 'Лодка - это транспортное средство, которое движется по воде',
    wordTranslate: 'лодка',
    wordsPerExampleSentence: 8,
  },
  {
    id: '5e9f5ee35eb9e72bc21af4a3',
    group: 0,
    page: 0,
    word: 'arrive',
    image: 'files/01_0003.jpg',
    audio: 'files/01_0003.mp3',
    audioMeaning: 'files/01_0003_meaning.mp3',
    audioExample: 'files/01_0003_example.mp3',
    textMeaning: 'To <i>arrive</i> is to get somewhere.',
    textExample: 'They <b>arrived</b> at school at 7 a.m.',
    transcription: '[əráiv]',
    textExampleTranslate: 'Они прибыли в школу в 7 часов утра',
    textMeaningTranslate: 'Приехать значит попасть куда-то',
    wordTranslate: 'прибыть',
    wordsPerExampleSentence: 7,
  },
];

export default class CardGame {
  static createCards() {
    const cardsArray = [];
    wordsExample.forEach((word) => {
      cardsArray.push(new Card(word));
    });
    return cardsArray;
  }

  static renderGame() {
    document.body.append(this.createAudioControl('on'));
    document.body.append(this.createTranslationControl('on'));
    swiper.allowSlideNext = false;
    this.addAudioControl();
    this.addTranslationControl();
    const cardsArray = this.createCards();
    cardsArray.forEach((card) => {
      swiper.appendSlide(card.renderCard());
    });
    this.addControl();
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
        document.querySelectorAll(`.swiper-slide-active #${input.dataset.word}-check span`).forEach((span) => {
          span.classList.add('translucent');
        });
      }
    };

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
    const input = document.querySelector('.swiper-slide-active .word-input');
    const checkedWord = this.checkWordSpelling(word, value);
    const wordContainer = document.querySelector(`.swiper-slide-active #${word}-check`);
    input.value = '';
    if (wordContainer) wordContainer.innerHTML = checkedWord;
  }

  static addControl() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        if (e.target.classList.contains('word-input') && e.target.closest('.card-container').classList.contains('swiper-slide-active')) {
          e.preventDefault();
          this.addInputHandler(e.target);
          document.querySelectorAll('.swiper-slide-active .zero-opacity').forEach((el) => {
            el.classList.remove('zero-opacity');
          });
          this.playAudio();
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
      }
    });

    document.querySelector('.swiper-button-next').addEventListener('click', () => {
      this.addInputHandler(document.querySelector('.swiper-slide-active .word-input'));
      document.querySelectorAll('.swiper-slide-active .zero-opacity').forEach((el) => {
        el.classList.remove('zero-opacity');
      });
      this.playAudio();
    });

    swiper.on('slideChange', () => {
      document.querySelectorAll('.swiper-slide-active audio').forEach((audio) => {
        audio.pause();
      });
    });
  }
}
