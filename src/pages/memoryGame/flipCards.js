import { unflipCards } from './helpers';

let hasFlippedCard = false;
let firstCard;
let secondCard;

function checkForMatch() {
  if (firstCard.dataset.content === secondCard.dataset.content) {
    // eslint-disable-next-line no-use-before-define
    disableCards();
  }
  unflipCards(firstCard, secondCard);
}

export function flipLittleCard() {
  this.classList.toggle('flip');
  this.classList.add('flip');
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  hasFlippedCard = false;

  checkForMatch();
}

function disableCards() {
  firstCard.removeEventListener('click', flipLittleCard);
  secondCard.removeEventListener('click', flipLittleCard);
}
