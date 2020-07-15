import { getUserID } from '../../services/authService';
import { getStatistics, putStatistics, addEmptyStatistics } from '../../services/statsService';

class StatsPage {
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
    document.querySelector('.wrapper').insertAdjacentHTML('beforeend', this.template);
    this.statsBtnBackClickHandler();
  }

  statsBtnBackClickHandler() {
    document.querySelector('.stats-btn-back').addEventListener('click', () => {
      this.showHidePages();
    });
  }

  async showHidePages() {
    this.isStatsOpened = !this.isStatsOpened;
    document.querySelector('.stats__wrapper').classList.toggle('hidden');
    document.querySelector('.result__wrapper').classList.toggle('hidden');

    if (!document.querySelector('.stats-item')) {
      if (this.isStatsOpened) {
        let stats;

        try {
          stats = await getStatistics({
            userId: getUserID(),
          });

          delete stats.id;
        } catch (e) {
          stats = {};
        }

        if (Object.keys(stats).length !== 0 && stats.optional.audioCall) {
          this.renderStats(stats.optional.audioCall);
        } else {
          this.setEmptyStats();
        }
      }
    }
  }

  renderStats(stats) {
    let statsTemplate = '';
    Object.entries(stats).forEach(([key, value]) => {
      statsTemplate += `
        <div class="stats-item">
          <span><b>Дата</b>: ${key.replace('T', ' ')}</span>
          <span><b>Сложность</b>: ${value.level}</span>
          <span><b>Раунд</b>: ${value.raund}</span>
          <span><b>Счет</b>: ${value.score}</span>
        </div>
      `;
    });
    document.querySelector('.stats-items').innerHTML = statsTemplate;
  }

  setEmptyStats() {
    document.querySelector('.stats-items').innerHTML = 'У Вас еще нету статистики';
  }

  async setGlobalStats(raightAnswersLength, wrongAnswersLength) {
    const dfLevelTitles = ['Базовый', 'Начальный', 'Легкий', 'Средний', 'Сложный', 'Максимальный', 'Изученные слова'];
    const currentDifficultyLevel = dfLevelTitles[localStorage.getItem('difficultAudioCall')];
    const currentRaund = localStorage.getItem('raund');
    const date = new Date();
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);
    const dateTemplate = `${day}.${month}.${date.getFullYear()}T${hours}:${minutes}:${seconds}`;
    const score = `${raightAnswersLength}-${wrongAnswersLength}`;

    let stats;

    try {
      stats = await getStatistics({
        userId: getUserID(),
      });
    } catch (e) {
      await addEmptyStatistics({
        userId: getUserID(),
      });
    }

    delete stats.id;

    if (!stats.optional) {
      stats.optional = {};
    }

    if (!stats.optional.audioCall) {
      stats.optional = {
        audioCall: {},
      };
    }

    stats.optional.audioCall[`${dateTemplate}`] = {
      score,
      level: currentDifficultyLevel,
      raund: currentRaund,
    };

    try {
      await putStatistics({
        userId: getUserID(),
        payload: stats,
      });
    } catch (e) {
      alert('Что то пошло не так при записи статистики');
    }
  }
}

export default new StatsPage();
