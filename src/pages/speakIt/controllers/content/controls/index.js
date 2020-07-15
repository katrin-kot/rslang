import PubSub from '../../pubSub';
import ControlsView from '../../../views/content/controls';

class ControlsController {
  init() {
    PubSub.subscribe('activateBtnStart', this.activateBtnStart);
    PubSub.subscribe('setDefaultStateControlsBtns', this.setDefaultStateControlsBtns);
  }

  activateBtnStart() {
    ControlsView.activateBtnStart();
  }

  setDefaultStateControlsBtns() {
    ControlsView.setDefaultStateBtns();
  }
}

export default new ControlsController();
