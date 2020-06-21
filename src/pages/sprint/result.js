import GameWindow from './gameWindow';

export default class Result extends GameWindow {
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
