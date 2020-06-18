import difficultOptions from '../../components/main/difficultOptions/difficultOptions';
//import './reset.css';
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

    gameField.insertAdjacentHTML('afterbegin', difficultOptions());
    gameField.insertAdjacentHTML(
      'beforeEnd',
      this.getButton('start-button', 'START')
    );

    //this.addDifficultOptions(gameField);
    //this.addStartButton(gameField);
  }

  getDifficultOptions() {
    const form = `
    <form class="difficult-form" action="difficult">
    <p><b>Выберите уровень сложности слов:</b></p>
     <input id="radio-difficult-1" name="difficult" type="radio" value="0" checked>
     <label class="label-difficult" for="radio-difficult-1">Базовый</label>
     <br>
     <input id="radio-difficult-2" name="difficult" type="radio" value="1">
     <label class="label-difficult" for="radio-difficult-2">Лёгкий</label>
     <br>
     <input id="radio-difficult-3" name="difficult" type="radio" value="3">
     <label class="label-difficult" for="radio-difficult-3">Простой</label>
     <br>
     <input id="radio-difficult-4" name="difficult" type="radio" value="4">
     <label class="label-difficult" for="radio-difficult-4">Средний</label>
     <br>
     <input id="radio-difficult-5" name="difficult" type="radio" value="5">
     <label class="label-difficult" for="radio-difficult-5">Сложный</label>
     <br>
     <input id="radio-difficult-6" name="difficult" type="radio" value="6">
     <label class="label-difficult" for="radio-difficult-6">Максимальный</label>
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
