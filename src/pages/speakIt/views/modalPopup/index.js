import createNode from '../createNodeHelper';

class ModalPopupView {
  constructor() {
    this.closePopup = this.closePopup.bind(this);
  }

  render() {
    const modalPopup = createNode('div', 'modal-popup');
    const modalPopupContentWrapper = createNode('div', 'modal-popup-content__wrapper');
    const preloader = createNode('div', 'loader');
    const btnClose = createNode('button', 'close-popup');
    modalPopupContentWrapper.append(btnClose, preloader);
    modalPopup.append(modalPopupContentWrapper);
    document.body.append(modalPopup);
    setTimeout(() => {
      modalPopup.style.width = '100%';
      modalPopup.style.height = '100%';
      modalPopup.style.opacity = 1;
    }, 100);
    this.insertContent();
    this.closePopup();
  }

  insertContent() {
    const popupImage = createNode('img', 'popup-word-img');
    document.querySelector('.modal-popup-content__wrapper').append(popupImage);
  }

  removePreloader() {
    document.querySelector('.modal-popup-content__wrapper .loader').classList.add('none');
  }

  closePopup() {
    document.querySelector('.close-popup').addEventListener('click', this.removePopup);
  }

  removePopup() {
    const popup = document.querySelector('.modal-popup');
    setTimeout(() => {
      popup.style.height = '0%';
      popup.style.opacity = 0;
    }, 100);
    setTimeout(() => {
      popup.remove();
    }, 300);
    document.querySelector('.close-popup').removeEventListener('click', this.removePopup);
  }
}

export default new ModalPopupView();
