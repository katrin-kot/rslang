import difficultOptions from '../../components/main/difficultOptions/difficultOptions';
import GameWindow from './gameWindow';

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
