import Card from './Card';
import { getUserID } from '../../services/authService';
import { createUserWord } from '../../services/userWordService';
import { addZeroToTime } from './helpers';

export default class NewCard extends Card {
  constructor(wordCard) {
    super(wordCard);
    this.settings = {
      difficulty: 'normal',
      optional: {
        status: 'to_study', count: '0', errors: '0', learningGroup: '1', date: 0, dateToShow: '0',
      },
    };
  }

  async createUserCard() {
    this.addDate();
    await createUserWord({
      userId: getUserID(),
      // eslint-disable-next-line no-underscore-dangle
      wordId: this.wordCard._id,
      word: this.settings,
    });
  }

  addSettings() {
    this.hardBtn.addEventListener('click', () => {
      this.settings.difficulty = 'hard';
    });
    this.easyBtn.addEventListener('click', () => {
      this.settings.difficulty = 'easy';
    });
    this.addToHardBtn.addEventListener('click', () => {
      this.settings.optional.status = 'hard';
      this.addToHardBtn.setAttribute('disabled', 'disabled');
      this.addToHardBtn.classList.add('btn_clicked');
    });
    this.deleteWordBtn.addEventListener('click', () => {
      this.settings.optional.status = 'delete';
      this.deleteWordBtn.setAttribute('disabled', 'disabled');
      this.deleteWordBtn.classList.add('btn_clicked');
    });
  }

  addDate() {
    const date = new Date();
    this.settings.optional.date = date.getTime();

    date.setDate(date.getDate() + 1);
    this.settings.optional.dateToShow = `${addZeroToTime(date.getMonth() + 1)}/${addZeroToTime(date.getDate())}/${date.getFullYear()}`;
  }

  addCountAndErrors(count, errors) {
    this.settings.optional.count = parseInt(this.settings.optional.count, 10) + count;
    this.settings.optional.errors = parseInt(this.settings.optional.errors, 10) + errors;
  }
}
