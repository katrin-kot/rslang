import PubSub from '../../controllers/pubSub';

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
    this.isStatsOpened = false;
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
    this.isStatsOpened = !this.isStatsOpened;
    const statsWrapper = document.querySelector('.stats__wrapper');
    statsWrapper.classList.toggle('hidden');
    document.querySelector('.result__wrapper').classList.toggle('hidden');
    if (this.isStatsOpened) {
      PubSub.publish('getStats');
    }
  }

  renderStats(stats) {
    let statsTemplate = '';
    Object.entries(stats).forEach(([key, value]) => {
      statsTemplate += `
      <div class="stats-item">
        <span><b>Дата</b>: ${key.replace('T', ' ')}</span>
        <span><b>Сложность</b>: ${value.level}</span>`;
      if (value.level !== 'Изученные слова') {
        statsTemplate += `<span><b>Раунд</b>: ${value.raund}</span>`;
      }
      statsTemplate += `<span><b>Счет</b>: ${value.score}</span>
        <span><b>Попыток произнести</b>: ${value.attempts}</span>
      </div>
      `;
    });
    document.querySelector('.stats-items').innerHTML = statsTemplate;
  }

  setEmptyStats() {
    document.querySelector('.stats-items').innerHTML = 'У Вас еще нету статистики';
  }
}

export default new StatsPageView();
