import difficultOptions from '../../components/main/difficultOptions/difficultOptions';
import './sprint.css';

class GameWindow {
  constructor() {}

  getButton(description) {
    const button = description.reduce((hypertext, option) => {
      return (
        hypertext + `<button class="${option.class}">${option.text}</button>`
      );
    }, '');

    return button;
  }

  addDivByClass(divClass, content = '') {
    const div = `<div class="${divClass}">${content}</div>`;

    return div;
  }
}

class Result extends GameWindow {
  constructor() {
    super();
    this.buttonList = [
      { class: 'back-button', text: 'к списку заданий' },
      { class: 'repeat-button', text: 'повторить' },
      { class: 'parameters-button', text: 'параметры' },
    ];
    this.statistic = [
      { word: 'qwe', translation: 'йцу', wasCorrect: false },
      { word: 'qwerty', translation: 'йцукен', wasCorrect: true },
      { word: 'qwer', translation: 'йцук', wasCorrect: false },
      { word: 'qwe', translation: 'йцу', wasCorrect: false },
      { word: 'qwerty', translation: 'йцукен', wasCorrect: true },
      { word: 'qwer', translation: 'йцук', wasCorrect: false },
      { word: 'qwe', translation: 'йцу', wasCorrect: false },
      { word: 'qwerty', translation: 'йцукен', wasCorrect: true },
      { word: 'qwer', translation: 'йцук', wasCorrect: false },
    ];
  }

  getPage() {
    const body = document.querySelector('body');
    const gameField = document.createElement('div');

    gameField.setAttribute('class', 'game-wrapper');

    body.appendChild(gameField);

    gameField.insertAdjacentHTML(
      'afterbegin',
      this.getResult(1, this.statistic)
    );

    gameField.insertAdjacentHTML(
      'beforeEnd',
      `<div class="buttons-block">${this.getButton(this.buttonList)}</div>`
    );
  }

  getResult(score = 0, statistic = []) {
    const result = `
      <div class="score">Ваш результат: ${score}</div>
      <div class="statistic">${this.getSortedStatistic(statistic)}</div>
    `;

    return result;
  }
  getSortedStatistic(statistic = []) {
    const convertedStatistic = statistic.sort((firstWord, secondWord) => {
      return firstWord.wasCorrect < secondWord.wasCorrect ? 1 : -1;
    });

    const correctWords = convertedStatistic.filter((word) => word.wasCorrect);
    const wrongWords = convertedStatistic.filter((word) => !word.wasCorrect);

    const hyperText = `<div>${this.getCorrectWordsBlock(
      correctWords
    )}<hr>${this.getWrongWordsBlock(wrongWords)}</div>`;
    return hyperText;
  }

  getCorrectWordsBlock(words) {
    return `
      <div class="correct-words">
        Знаю <span class="correct-words-count">${words.length}</span>
          ${words.map((word) => this.getWordStatisticLine(word)).join('')}
      </div>`;
  }

  getWrongWordsBlock(words) {
    return `
    <div class="wrong-words">
      Ошибок <span class="wrong-words-count">${words.length}</span>
        ${words.map((word) => this.getWordStatisticLine(word)).join('')}
    </div>`;
  }

  getWordStatisticLine(word) {
    return `
      <div>
        <span class="word-audio"></span>
        <span class="word">${word.word}</span>
        <span class="word-translation"> — ${word.translation}</span>
      </div>`;
  }
}

class Game extends GameWindow {
  constructor() {
    super();
    this.buttonList = [
      { class: 'wrong-answer-button', text: 'Неверно' },
      { class: 'correct-answer-button', text: 'Верно' },
    ];
  }

  getPage() {
    const body = document.querySelector('body');
    const gameField = document.createElement('div');

    gameField.setAttribute('class', 'game-wrapper');

    body.appendChild(gameField);

    gameField.insertAdjacentHTML(
      'beforebegin',
      this.addDivByClass('game-score', 0)
    );

    gameField.insertAdjacentHTML(
      'afterbegin',
      this.addDivByClass('game-bonus')
    );

    gameField.insertAdjacentHTML('beforeend', this.addGameImage());

    gameField.insertAdjacentHTML('beforeend', this.addDivByClass('game-word'));

    gameField.insertAdjacentHTML(
      'beforeend',
      this.addDivByClass('game-translation')
    );

    gameField.insertAdjacentHTML('beforeend', '<hr>');

    gameField.insertAdjacentHTML(
      'beforeEnd',
      this.addDivByClass('buttons-block', this.getButton(this.buttonList))
    );
  }

  addGameImage() {
    const image = `<img class="game-image" src="/assets/default-image.png">`;

    return image;
  }
}

class StartPage extends GameWindow {
  constructor() {
    super();
    this.additionOption = [
      {
        id: 'studied-words',
        value: 'studied',
        text: ' только изученные слова',
        hint:
          'В задании будут использоваться ранее изученные слова. При их отсутствии или нехватке, вам будут добавлены новые слова того же уровня сложности.',
      },
      {
        id: 'use-cartoon',
        value: 'cartoon',
        text: ' с изображениями',
        hint: 'В задании будут использоваться изображения английских слов.',
      },
    ];
    this.buttonList = [{ class: 'start-button', text: 'START' }];
  }

  getPage() {
    const body = document.querySelector('body');
    const gameField = document.createElement('div');

    gameField.setAttribute('class', 'game-wrapper');

    body.appendChild(gameField);

    gameField.insertAdjacentHTML('afterbegin', difficultOptions());
    gameField.insertAdjacentHTML(
      'beforeEnd',
      this.getOptionField(this.additionOption)
    );
    gameField.insertAdjacentHTML('beforeEnd', this.getButton(this.buttonList));
  }

  getOptionField(description) {
    const additionOptions = description.reduce((hypertext, option) => {
      return (
        hypertext +
        `
      <div class="additonal-option">
        <input id="${option.id}" type="checkbox" name="check" value="${option.value}">
        <label for="${option.id}">${option.text}</label>
        <div class="additonal-option-hint" data-title="${option.hint}">
        </div>
      </div>
      `
      );
    }, '');

    return additionOptions;
  }
}

class Builder {
  constructor() {
    this.startPage = new StartPage();
    this.game = new Game();
    this.result = new Result();
  }

  initialize() {
    this.startPage.getPage();
    this.game.getPage();
    this.result.getPage();
  }
}

const builder = new Builder();
builder.initialize();
