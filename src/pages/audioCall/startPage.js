import Game from './audioCall';

const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
const starter = document.createElement('div');
starter.innerHTML = ` <div class="start-page">
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
wrapper.append(starter);
document.body.append(wrapper);

document.querySelector('.start-page__button').addEventListener('click', () => {
  wrapper.innerHTML = '';
  const game = new Game();
  game.render();
});
