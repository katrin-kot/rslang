import Game from './audioCall';

const WRAPPER = document.createElement('div');
WRAPPER.classList.add('wrapper');
let STARTER = document.createElement('div');
STARTER.innerHTML = ` <div class="start-page">
<div class="start-page__title">
  Аудиовызов
</div>
<div class="start-page__description">
  Вы услышите аудио слова на английском, ваша задача заключается в нахождении перевода слова из перечисленных вариантов.
</div>
<div class="start-page__button">
  Начать игру
</div>
</div>`;
WRAPPER.append(STARTER);
document.body.append(WRAPPER);


document.querySelector('.start-page__button').addEventListener('click', () => {
  WRAPPER.innerHTML = '';
  const game = new Game();
  game.render();
});

