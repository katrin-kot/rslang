import PubSub from '../../pubSub';
import Words from '../../../models/words';
import CardsView from '../../../views/content/cards';
import ControlsView from '../../../views/content/controls';
import { checkUserLogin } from '../../../../../services/verifyUserService';

const STUDY_WORDS_GROUP = 6;
const WORDS_PER_PAGE = 10;

class CardsController {
  constructor() {
    this.isStudyWordsRendered = false;
    this.renderCards = this.renderCards.bind(this);
  }

  init() {
    PubSub.subscribe('renderCards', this.renderCards);
  }

  async renderCards(userChoice) {
    try {
      Words.removeCurrentWords();
      let userRaund = 0;
      let userdifficultyLevel = 0;

      if (userChoice) {
        userRaund = parseInt(userChoice.raund, 10);
        userdifficultyLevel = parseInt(userChoice.difficultyLevel, 10);
      }

      CardsView.showPreloaderForCards();

      const words = await Words.getWords(userdifficultyLevel, userRaund, WORDS_PER_PAGE);
      const studyWords = await Words.getStudyWords(WORDS_PER_PAGE);

      // eslint-disable-next-line max-len
      if ((userdifficultyLevel === STUDY_WORDS_GROUP) || (studyWords !== undefined && !this.isStudyWordsRendered)) {
        if (studyWords === undefined) {
          // TODO: добавить notification, что недостаточно изученных слов
          ControlsView.disableBtnStart();
          return;
        }
        CardsView.render(studyWords);
        Words.setCurrentWords(studyWords);
        this.isStudyWordsRendered = true;
      } else {
        CardsView.render(words);
        Words.setCurrentWords(words);
      }
      PubSub.publish('activateBtnStart');
    } catch (e) {
      await checkUserLogin();
      // TODO: добавить notification (что то пошло не так при загрузке страницы)
    }
  }
}

export default new CardsController();
