class StatsPageView {
  constructor() {
    this.template = `
      <div class="stats__wrapper hidden">
        <div class ="stats__container">
          <h2 class="stats-title">Statistics</h2>
          <div class="stats-items"></div>
          <div class="btn-stats-back__wrapper">
            <button class="stats-btn-back">Back</button>
          </div>
        </div>
      </div>
    `;
    this.statsBtnBackClickHandler = this.statsBtnBackClickHandler.bind(this);
  }

  render() {
    const appContainer = document.querySelector('.app-speakIt');
    appContainer.insertAdjacentHTML('beforeend', this.template);
    this.statsBtnBackClickHandler();
  }

  statsBtnBackClickHandler() {
    document.querySelector('.stats-btn-back').addEventListener('click', () => {
      this.showHidePages();
    });
  }

  showHidePages() {
    document.querySelector('.stats__wrapper').classList.toggle('hidden');
    document.querySelector('.result__wrapper').classList.toggle('hidden');
    // TODO: добавить метод для рендера статистики из базы (для отображения)
  }
}

export default new StatsPageView();
