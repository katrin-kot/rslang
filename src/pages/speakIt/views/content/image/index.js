import PubSub from '../../../controllers/pubSub';

const DEFAUTL_IMG_SRC = './assets/images/speakit-words-img-stub.jpg';
const CONGRATS_IMG_SRC = './assets/images/congratulations.gif';
const IMAGE_SRC = 'https://raw.githubusercontent.com/bobrui4anin/rslang-data/master/';

class ImageView {
  replaceImage(imageSrc) {
    this.loadImage(`${IMAGE_SRC}${imageSrc}`, '.word-image');
  }

  insertWordImage(imageSrc) {
    this.loadImage(`${IMAGE_SRC}${imageSrc}`, '.popup-word-img', true);
  }

  loadCongratulationsImg() {
    this.loadImage(`${CONGRATS_IMG_SRC}`, '.user-congratulation-img');
  }

  loadImage(imageSrc, element, removePreloader) {
    const img = new Image();
    img.src = `${imageSrc}`;
    img.onload = () => {
      const imageElement = document.querySelector(element);
      imageElement.setAttribute('src', imageSrc);
      if (removePreloader) {
        PubSub.publish('hidePreloader');
      }
    };
  }

  setDefaultImage() {
    document.querySelector('.word-image').setAttribute('src', `${DEFAUTL_IMG_SRC}`);
  }
}

export default new ImageView();
