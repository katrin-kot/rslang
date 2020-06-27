import { getUserID } from '../../services/authService';

const body = document.querySelector('body');
const userId = getUserID();
export function renderPlayPage(group, count) {
  body.innerHTML = '';
  body.innerHTML = `
    <section class="memory-game">
    </section>
    `;
  const section = document.querySelector('.memory-game');
  while (count > 0) {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    if (count % 2 === 0) {
      card.innerHTML = `
       <div class="front-face" data-content="english">Hello</div>
       <img class="back-face" src="../../../assets/images/logo.png" alt="Memory Card">
       `;
    } else {
      card.innerHTML = `<div class="front-face" data-content="english">Привет</div>
       <img class="back-face" src="../../../assets/images/logo.png" alt="Memory Card"></img>`;
    }
    section.appendChild(card);
    count -= 1;
  }
  const cards = document.querySelectorAll('.memory-card');
console.log(cards);
cards.forEach((elem) => {
  elem.addEventListener('click', flipLittleCard);
});
  return body;
}
