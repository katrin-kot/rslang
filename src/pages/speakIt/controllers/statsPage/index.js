import StatsPageView from '../../views/statsPage';
import PubSub from '../pubSub';

class StatsPageController {
  init() {
    StatsPageView.render();
    PubSub.subscribe('showStatsPage', this.showStatsPage);
  }

  showStatsPage() {
    StatsPageView.showHidePages();
    // TODO: добавить метод для рендера статистики из базы (для контроллера)
  }
}

export default new StatsPageController();
