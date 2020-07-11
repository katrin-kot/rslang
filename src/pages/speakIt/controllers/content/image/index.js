import PubSub from '../../pubSub';
import Words from '../../../models/words';
import ImageView from '../../../views/content/image';

class ImageController {
  init() {
    PubSub.subscribe('changeImage', this.changeImage);
    PubSub.subscribe('loadUserCongrats', this.loadUserCongrats);
  }

  changeImage(cardIndex) {
    const currentWord = Words.getCurrentWords()[cardIndex];
    ImageView.replaceImage(currentWord.image);
  }

  loadUserCongrats() {
    ImageView.loadCongratulationsImg();
  }
}

export default new ImageController();
