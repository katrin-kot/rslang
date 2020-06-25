import Game from './audioCall';

const WRAPPER = document.createElement('div');
WRAPPER.classList.add('wrapper');
let STARTER = document.createElement('div');
STARTER.innerHTML = ` <div class="start-page">
<div class="start-page__title">
  AUDIOCALL
</div>
<div class="start-page__description">
  You will hear the audio of the english word. Your task is to find the correct translation from the provided options.
</div>
<div class="start-page__button">
  Start Game
</div>
</div>`;
WRAPPER.append(STARTER);
document.body.append(WRAPPER);


document.querySelector('.start-page__button').addEventListener('click', () => {
  WRAPPER.innerHTML = '';
  const game = new Game();
  game.render();
});