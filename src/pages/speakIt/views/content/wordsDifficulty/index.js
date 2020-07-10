import PubSub from '../../../controllers/pubSub';

const QUANTITY_RAUNDS = 30;

class WordsDifficultyView {
  constructor() {
    this.dfLevelTemplate = `
      <div class="drop-down__container">
        <div class="select-box">
          <div class="options__container">
            <div class="drop-down__option" data-option="6">Изученные слова</div>
            <div class="drop-down__option" data-option="0">Базовый</div>
            <div class="drop-down__option" data-option="1">Начальный</div>
            <div class="drop-down__option" data-option="2">Легкий</div>
            <div class="drop-down__option" data-option="3">Средний</div>
            <div class="drop-down__option" data-option="4">Сложный</div>
            <div class="drop-down__option" data-option="5">Максимальный</div>
          </div>
          <div class="selected__item" data-current-option="0">Выберите уровень сложности</div>
        </div>
      </div>
    `;

    this.raundsTemplate = `
      <div class="raund__container">
        <div class="round-select-box">
          <div class="raund-options__container">
            ${this.createRaunds()}
          </div>
          <div class="selected__raund" data-current-raund="0">Выберите раунд</div>
        </div>
      </div>
    `;
  }

  render() {
    const difficultyWrapper = document.querySelector('.speakIt__difficulty-lvl__wrapper');
    difficultyWrapper.insertAdjacentHTML('beforeend', this.dfLevelTemplate);
    difficultyWrapper.insertAdjacentHTML('beforeend', this.raundsTemplate);
    this.selectItem('.selected__item', '.options__container', 'active__option', 'drop-down__option', 'data-option', 'data-current-option');
    this.selectItem('.selected__raund', '.raund-options__container', 'active__raund', 'drop-down__raund', 'data-raund', 'data-current-raund');
    this.toggleDropDowns();
  }

  selectItem(selected, itemContainer, activeItem, dropDownItem, dataAttribute, selectedAttr) {
    const selectedElement = document.querySelector(selected);
    const elementContainer = document.querySelector(itemContainer);

    selectedElement.addEventListener('click', () => {
      elementContainer.classList.toggle(activeItem);
    });

    elementContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains(dropDownItem)) {
        PubSub.publish('setGlobalStatsOnAction');
        selectedElement.innerHTML = e.target.innerText;
        selectedElement.setAttribute(selectedAttr, e.target.getAttribute(dataAttribute));
        elementContainer.classList.remove(activeItem);
        PubSub.publish('setDefaultStateControlsBtns');
        PubSub.publish('renderCards', {
          difficultyLevel: document.querySelector('.selected__item').dataset.currentOption,
          raund: document.querySelector('.selected__raund').dataset.currentRaund,
        });
        PubSub.publish('resetProgress');
      }
    });
  }

  toggleDropDowns() {
    document.body.addEventListener('click', (e) => {
      const activeOption = document.querySelector('.active__option');
      const activeRaund = document.querySelector('.active__raund');
      if (activeRaund && !e.target.closest('.drop-down__raund') && !e.target.closest('.selected__raund')) {
        activeRaund.classList.remove('active__raund');
      }
      if (activeOption && !e.target.closest('.drop-down__option') && !e.target.closest('.selected__item')) {
        activeOption.classList.remove('active__option');
      }
    }, true);
  }

  createRaunds() {
    const optionsForRaund = Array.from({
      length: QUANTITY_RAUNDS,
    }, (el, indx) => `
        <span class="drop-down__raund" data-raund="${indx}">${indx + 1}</span>
      `).join('');
    return optionsForRaund;
  }

  getCunrrentWordsDifficulty() {
    const dfLevelTitles = ['Базовый', 'Начальный', 'Легкий', 'Средний', 'Сложный', 'Максимальный', 'Изученные слова'];
    const currentDfLevel = parseInt(document.querySelector('.selected__item').dataset.currentOption, 10);
    return {
      difficultyLevel: dfLevelTitles[currentDfLevel],
      raund: document.querySelector('.selected__raund').dataset.currentRaund,
    };
  }
}

export default new WordsDifficultyView();
