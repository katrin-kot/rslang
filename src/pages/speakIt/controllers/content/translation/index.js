import PubSub from '../../pubSub';
import Words from '../../../models/words';
import TranslationView from '../../../views/content/translation';

class TranslationController {
  init() {
    PubSub.subscribe('showTranslation', this.getTranslation);
  }

  getTranslation(cardIndex) {
    const currentWord = Words.getCurrentWords()[cardIndex];
    TranslationView.showTranslation(currentWord.wordTranslate);
  }
}

export default new TranslationController();
