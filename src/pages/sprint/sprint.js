import './difficultOptions.css';
import './reset.css';
class Result {
  constructor() {}
}

class Game {
  constructor() {}
}

class StartPage {
  constructor() {}

  getPage() {
    const body = document.querySelector('body');
    const gameField = document.createElement('div');

    gameField.setAttribute('class', 'game-wrapper');

    body.appendChild(gameField);

    gameField.insertAdjacentHTML('afterbegin', this.getDifficultOptions());
    gameField.insertAdjacentHTML(
      'beforeEnd',
      this.getButton('start-button', 'START')
    );
    //this.addDifficultOptions(gameField);
    //this.addStartButton(gameField);
  }

  getDifficultOptions() {
    const form = `
    <form action="difficult">
    <p><b>Выберите уровень сложности слов:</b></p>
     <label><input name="difficult" type="radio" value="0" checked>1</label>
     <label><input name="difficult" type="radio" value="1">2</label>
     <label><input name="difficult" type="radio" value="3">3</label>
     <label><input name="difficult" type="radio" value="4">4</label>
     <label><input name="difficult" type="radio" value="5">5</label>
     <label><input name="difficult" type="radio" value="6">6</label>
   </form> `;

    return form;
  }

  getButton(buttonClass, buttonText) {
    const button = `<button class="${buttonClass}">${buttonText}</button>`;

    return button;
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
