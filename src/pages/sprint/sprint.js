import difficultOptions from '../../components/main/difficultOptions/difficultOptions';
import './sprint.css';
//import './reset.css';
class Result {
  constructor() {}
}

class Game {
  constructor() {}
}

class StartPage {
  constructor() {
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
        text: ' упрощённый с изображениями',
        hint: 'В задании будут использоваться изображения английских слов.',
      },
    ];
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
    gameField.insertAdjacentHTML(
      'beforeEnd',
      this.getButton('start-button', 'START')
    );

    console.log(this.getOptionField(this.additionOption));
  }

  getButton(buttonClass, buttonText) {
    const button = `<button class="${buttonClass}">${buttonText}</button>`;

    return button;
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
    this.Result = new Result();
  }

  initialize() {
    this.startPage.getPage();
  }
}

const builder = new Builder();
builder.initialize();
