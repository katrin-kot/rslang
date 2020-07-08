import difficultOptions from '../../components/main/difficultOptions/difficultOptions';
import GameWindow from './gameWindow';
import { checkUserLogin } from '../../services/verifyUserService';

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

  initPage(startPage, gamePage, resultPage) {
    this.startPage = startPage;
    this.gamePage = gamePage;
    this.resultPage = resultPage;

    checkUserLogin();
    this.getPage();
  }

  getPage() {
    const body = document.querySelector('body');

    const startField = `
    <div class="game-wrapper">
      ${difficultOptions()}
      <span>Выберите раунд: </span> <input class="round" type="number" value="1" max="30" min="1">
      ${this.getOptionField(this.additionOption)}
      <div class="buttons-block">${this.getButton(this.buttonList)}</>
    </div>
    `;

    body.insertAdjacentHTML('afterbegin', startField);

    this.setDefaultOptions();
    this.listenToButtonsClick();
    this.listenToChangedifficulty();
    this.listenToAdditionalOptions();
  }

  getOptionField(description) {
    const additionOptions = description.reduce(
      (hypertext, option) => `${hypertext}
        <div class="additional-option">
          <input id="${option.id}" type="checkbox" name="check" value="${option.value}" ${option.checked}>
          <label for="${option.id}">${option.text}</label>
          <div class="additional-option-hint" data-title="${option.hint}">
          </div>
        </div>
        `,
      '',
    );

    return additionOptions;
  }

  listenToButtonsClick() {
    const buttons = document.querySelector('.buttons-block');

    buttons.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        if (event.target.classList.contains('start-button')) {
          this.updateRound();
          this.openGamePage(this.startPage, this.gamePage, this.resultPage);
        }
      }
    });
  }

  setDefaultOptions() {
    localStorage.setItem('difficultySprint', 0);
    localStorage.setItem('studiedSprint', true);
    localStorage.setItem('cartoonSprint', false);
    localStorage.setItem('roundSprint', 0);
  }

  listenToChangedifficulty() {
    const form = document.querySelector('.form-difficult');

    form.addEventListener('click', () => {
      const inputElements = form.querySelectorAll('input');

      inputElements.forEach((item) => {
        if (item.checked) {
          localStorage.setItem('difficultySprint', item.value);
        }
      });
    });
  }

  listenToAdditionalOptions() {
    const additionalOptions = document.querySelectorAll(
      '.additional-option input',
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

  updateRound() {
    const roundInput = document.querySelector('.round');

    localStorage.setItem('roundSprint', roundInput.value - 1);
  }
}
