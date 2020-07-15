import PubSub from '../pubSub';
import ModalPopupView from '../../views/modalPopup';
import ImageView from '../../views/content/image';

class ModalPopupController {
  init() {
    PubSub.subscribe('showPopup', this.showPopup);
    PubSub.subscribe('hidePreloader', this.hidePreloader);
  }

  showPopup(imageSrc) {
    ModalPopupView.render();
    ImageView.insertWordImage(imageSrc);
  }

  hidePreloader() {
    ModalPopupView.removePreloader();
  }
}

export default new ModalPopupController();
