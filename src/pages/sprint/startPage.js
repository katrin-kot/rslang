import difficultOptions from '../../components/main/difficultOptions/difficultOptions';
import GameWindow from './gameWindow';
import Game from './game';

export default class StartPage extends GameWindow {
  constructor() {
    super();
    this.additionOption = [
      {
        id: 'studied-words',
        value: 'studied',
        text: ' только изученные слова',
        hint:
          'В задании будут использоваться ранее изученные слова. При их отсутствии или нехватке, вам будут добавлены новые слова того же уровня сложности.',
        checked: 'checked',
      },
      {
        id: 'use-cartoon',
        value: 'cartoon',
        text: ' с изображениями',
        hint: 'В задании будут использоваться изображения английских слов.',
        checked: '',
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
    gameField.insertAdjacentHTML(
      'beforeEnd',
      `<div class="buttons-block">${this.getButton(this.buttonList)}</div>`
    );

    this.setDefaultOptions();
    this.listenToButtonsClick();
    this.listenToChangeDifficult();
    this.listenToAdditionalOptions();
  }

  getOptionField(description) {
    const additionOptions = description.reduce((hypertext, option) => {
      return (
        hypertext +
        `
        <div class="additional-option">
          <input id="${option.id}" type="checkbox" name="check" value="${option.value}" ${option.checked}>
          <label for="${option.id}">${option.text}</label>
          <div class="additional-option-hint" data-title="${option.hint}">
          </div>
        </div>
        `
      );
    }, '');

    return additionOptions;
  }

  listenToButtonsClick() {
    const buttons = document.querySelector('.buttons-block');

    buttons.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        if (event.target.classList.contains('start-button')) {
          this.openGamePage(new Game());
        }
      }
    });
  }

  setDefaultOptions() {
    localStorage.setItem('difficultSprint', 0);
    localStorage.setItem('studiedSprint', true);
    localStorage.setItem('cartoonSprint', false);
  }

  listenToChangeDifficult() {
    const form = document.querySelector('.form-difficult');

    form.addEventListener('click', () => {
      const inputElements = form.querySelectorAll('input');

      inputElements.forEach((item) => {
        if (item.checked) {
          localStorage.setItem('difficultSprint', item.value);
        }
      });
    });
  }

  listenToAdditionalOptions() {
    const additionalOptions = document.querySelectorAll(
      '.additional-option input'
    );

    additionalOptions.forEach((option) => {
      option.addEventListener('click', (event) => {
        if (event.target.checked) {
          localStorage.setItem(`${event.target.value}Sprint`, true);
        } else {
          localStorage.setItem(`${event.target.value}Sprint`, false);
        }
      });
    });
  }
}
