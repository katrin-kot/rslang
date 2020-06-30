import Game from "./audioCall";

const wrapper = document.createElement("div");
wrapper.classList.add("wrapper");
let starter = document.createElement("div");
starter.innerHTML = ` <div class="start-page">
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
wrapper.append(starter);
document.body.append(wrapper);

document.querySelector(".start-page__button").addEventListener("click", () => {
  wrapper.innerHTML = "";
  const game = new Game();
  game.render();
});
