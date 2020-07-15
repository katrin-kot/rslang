import { unique } from './helpers';
import { gameOver } from './gameOver';

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

function checkForMatch() {
  if (firstCard.dataset.content === secondCard.dataset.content) {
    // eslint-disable-next-line no-use-before-define
    disableCards();
    const score = document.querySelector('.score');
    if (document.querySelectorAll('.memory-card:not(.flip)').length === 0) {
      setTimeout(() => gameOver(score.textContent, window.words), 2000);
    }
  } else {
    const score = document.querySelector('.score');
    if (score.textContent === '10') {
      const errorCards = document.querySelectorAll('.memory-card:not(.flip)');
      const arrError = Array.from(errorCards).map(
        (elem) => elem.dataset.content,
      );
      const idError = Array.from(errorCards).map(
        (elem) => elem.dataset.id,
      );
      window.idError = unique(idError);
      const error = unique(arrError);
      setTimeout(
        () => gameOver(score.textContent - 10, window.words, error),
        2000,
      );
    } else {
      score.textContent -= 10;
    }
    // eslint-disable-next-line no-use-before-define
    unflipCards();
  }
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

export function flipLittleCard(e) {
  if (lockBoard) return;
  const card = e.target.closest('.memory-card');
  if (card === firstCard) return;
  card.classList.add('flip');
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = card;
    return;
  }
  secondCard = card;

  checkForMatch();
}

function disableCards() {
  firstCard.removeEventListener('click', flipLittleCard);
  secondCard.removeEventListener('click', flipLittleCard);
  resetBoard();
}
