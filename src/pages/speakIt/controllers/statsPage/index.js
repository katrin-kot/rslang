import StatsPageView from '../../views/statsPage';
import PubSub from '../pubSub';
import { getUserID } from '../../../../services/authService';
import { getStatistics } from '../../../../services/statsService';

class StatsPageController {
  init() {
    StatsPageView.render();
    PubSub.subscribe('showStatsPage', this.showStatsPage);
    PubSub.subscribe('getStats', this.getStats);
  }

  showStatsPage() {
    StatsPageView.showHidePages();
  }

  async getStats() {
    let stats;
    try {
      stats = await getStatistics({
        userId: getUserID(),
      });
      delete stats.id;
    } catch (e) {
      stats = {};
    }
    if (Object.keys(stats).length !== 0) {
      StatsPageView.renderStats(stats.optional.speakIt);
    } else {
      StatsPageView.setEmptyStats();
    }
  }
}

export default new StatsPageController();
