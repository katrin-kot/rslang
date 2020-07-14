import createNode from '../createNodeHelper';

class NotificationsView {
  showNotification(message, type) {
    const notification = createNode('div', 'notification', 'notification-hidden');

    notification.setAttribute('data-type', type);
    notification.innerText = message;

    document.querySelector('.app-speakIt').append(notification);
    setTimeout(() => {
      notification.classList.add('notification-visible');
    }, 50);

    setTimeout(() => {
      notification.classList.remove('notification-visible');
    }, 3500);

    setTimeout(() => {
      notification.remove();
    }, 4000);
  }
}

export default new NotificationsView();
