import Card from './Card';
import { getUserID } from '../../services/authService';
import { updateUserWord } from '../../services/userWordService';
import { addZeroToTime, countDaysInterval } from './helpers';

export default class LearningCard extends Card {
  constructor(wordCard) {
    super(wordCard);
    this.settings = wordCard.userWord;
    this.ease = 'good';
    this.again = false;
  }

  async createUserCard() {
    this.processWord();

    await updateUserWord({
      userId: getUserID(),
      // eslint-disable-next-line no-underscore-dangle
      wordId: this.wordCard._id,
      word: this.settings,
    });
  }

  addSettings() {
    this.hardBtn.addEventListener('click', () => {
      this.settings.difficulty = 'hard';
      this.ease = 'hard';
    });
    this.easyBtn.addEventListener('click', () => {
      this.settings.difficulty = 'easy';
      this.ease = 'easy';
    });
    this.goodBtn.addEventListener('click', () => {
      this.settings.difficulty = 'good';
      this.ease = 'good';
    });
    this.againBtn.addEventListener('click', () => {
      this.again = true;
    });
    this.addToHardBtn.addEventListener('click', () => {
      this.settings.optional.status = 'hard';
    });
    this.deleteWordBtn.addEventListener('click', () => {
      this.settings.optional.status = 'delete';
    });
  }

  addDateToShow(days) {
    const date = new Date();
    this.settings.optional.date = date.getTime();

    date.setDate(date.getDate() + days);
    this.settings.optional.dateToShow = `${addZeroToTime(date.getMonth() + 1)}/${addZeroToTime(date.getDate())}/${date.getFullYear()}`;
  }

  processWord() {
    if (this.error || this.again) {
      this.settings.optional.learningGroup = 1;
    } else {
      this.settings.optional.learningGroup = parseInt(this.settings.optional.learningGroup, 10) + 1;
    }
    const group = parseInt(this.settings.optional.learningGroup, 10);
    const days = countDaysInterval(group, this.ease);
    this.addDateToShow(days);
  }

  addCountAndErrors(count, errors) {
    // eslint-disable-next-line max-len
    const optCount = Number.isNaN(parseInt(this.settings.optional.count, 10)) ? 0 : parseInt(this.settings.optional.count, 10);
    // eslint-disable-next-line max-len
    const optErr = Number.isNaN(parseInt(this.settings.optional.errors, 10)) ? 0 : parseInt(this.settings.optional.errors, 10);
    this.settings.optional.count = optCount + count;
    this.settings.optional.errors = optErr + errors;
  }
}
