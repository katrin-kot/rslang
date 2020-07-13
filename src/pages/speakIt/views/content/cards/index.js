import PubSub from '../../../controllers/pubSub';

class CardsView {
  constructor() {
    this.template = '';
    this.isListen = false;
  }

  render(words) {
    this.template = '';
    this.addWordsInTemplate(words);
    document.querySelector('.column-right-words').innerHTML = this.template;
    this.hidePreloaderForCards();
    document.querySelector('.progress-bar__qunatity-words').innerHTML = words.length;
    if (!this.isListen) {
      this.cardClickHandler();
    }
  }

  addWordsInTemplate(words) {
    words.forEach((item, indx) => {
      this.template += `
        <div class="card" data-answer="0" data-word="${item.word.toLowerCase()}" data-index="${indx}">
          <div class="card-micro-img"></div>
          <div class="card-word__wrapper">
            <span class="card-word">${item.word}</span>
            <span class="card-word-transcription">${item.transcription}</span>
          </div>
        </div>
      `;
    });
  }

  cardClickHandler() {
    document.querySelector('.column-right-words').addEventListener('click', (e) => {
      if (e.target.closest('.card')) {
        const card = e.target.closest('.card');
        const exampleBtn = document.querySelector('.play-btn');
        const exampleBtnBlock = document.querySelector('.sound-example');
        exampleBtnBlock.classList.remove('hidden');
        exampleBtn.setAttribute('data-word-index', card.dataset.index);
        this.removeActiveCardClass();
        this.addActiveCardClass(card);
        PubSub.publish('playVoiceWord', { cardIndex: card.dataset.index, type: 'word' });
        PubSub.publish('changeImage', card.dataset.index);
        PubSub.publish('showTranslation', card.dataset.index);
      }
    });
    this.isListen = true;
  }

  removeActiveCardClass() {
    document.querySelectorAll('.card').forEach((card) => {
      card.classList.remove('card-active');
    });
  }

  addActiveCardClass(card) {
    if (card) {
      card.classList.add('card-active');
    }
  }

  cardsEventPointer() {
    document.querySelectorAll('.card').forEach((card) => {
      card.classList.toggle('event-pointer-none');
    });
  }

  setDefaultStateToListener() {
    this.isListen = false;
  }

  showPreloaderForCards() {
    document.querySelector('.column-right-words').innerHTML = '';
    document.querySelector('.loader').classList.remove('none');
  }

  hidePreloaderForCards() {
    document.querySelector('.loader').classList.add('none');
  }

  getUnansweredWords() {
    return [...document.querySelectorAll('[data-answer="0"]')].map((card) => parseInt(card.dataset.index, 10));
  }
}

export default new CardsView();
