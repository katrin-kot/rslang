export function unflipCards(firstCard, secondCard) {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
  }, 1500);
}
