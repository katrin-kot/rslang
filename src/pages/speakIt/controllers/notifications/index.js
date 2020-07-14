import PubSub from '../pubSub';
import NotificationsView from '../../views/notifications';

class NotificationsController {
  init() {
    PubSub.subscribe('showNotification', this.setNotification);
  }

  setNotification(notInfo) {
    NotificationsView.showNotification(notInfo.message, notInfo.type);
  }
}

export default new NotificationsController();
