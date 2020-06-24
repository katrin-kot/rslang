import './audioCall.css';
import questions from './dummyData';



// let BODY = document.createElement('div');
// BODY.innerHTML = ` <div class="start-page">
// <div class="start-page__title">
//   AUDIOCALL
// </div>
// <div class="start-page__description">
//   You will hear the audio of the english word. You task is to find the correct translation from the provided options.
// </div>
// <div class="start-page__button">
//   Start Game
// </div>
// </div>`;
// document.body.append(BODY);

// document.querySelector('.start-page__button').addEventListener('click', () => {
//   BODY.innerHTML = '';
//   startGame();
// });


// function startGame() {

// }


class Game {
  constructor() {
    this.round = 1;
    this.rightAnswer = questions[this.round].rightAnswer;
  }

  render() {
    const GAME = document.createElement('div');
    const QUESTION_BUTTON = document.createElement('div');
    const volumeIcon = document.createElement('img');
    const VARIANTS = document.createElement('div');
 
    const NEXT_BUTTON = document.createElement('div');

    GAME.classList.add('game');
    QUESTION_BUTTON.classList.add('question-button');
    volumeIcon.classList.add('question-button__icon');
    volumeIcon.setAttribute('src','/assets/images/speaker.png');
    VARIANTS.classList.add('variants');
    NEXT_BUTTON.classList.add('next-button');
    NEXT_BUTTON.innerText = 'NE ZNAYU';


    QUESTION_BUTTON.appendChild(volumeIcon);
    
    for(let i = 1; i < 7; i += 1) {
      const OPTION = document.createElement('div');
      const OPTION_NUMBER = document.createElement('div');
      const OPTION_WORD = document.createElement('div');
      OPTION.classList.add('option');
      OPTION_NUMBER.classList.add('option__number');
      OPTION_WORD.classList.add('option__word');
      OPTION_NUMBER.innerText = i;
      OPTION_WORD.innerText = questions[this.round].options[i - 1];
      OPTION.appendChild(OPTION_NUMBER);
      OPTION.appendChild(OPTION_WORD);
      VARIANTS.appendChild(OPTION);

      OPTION.addEventListener('click', () => {
        let sound;
        if (OPTION.lastChild.innerText == this.rightAnswer) {
          sound = new Audio('/assets/audios/correct.mp3');
        } else {
          sound = new Audio('/assets/audios/wrong.mp3');
        }
        sound.play();
      });
    }

    GAME.appendChild(QUESTION_BUTTON);
    GAME.appendChild(VARIANTS);
    GAME.appendChild(NEXT_BUTTON);

    document.querySelector('.wrapper').appendChild(GAME);

    QUESTION_BUTTON.addEventListener('click', () => {
      const audio = new Audio(questions[this.round].question);
      audio.play();
    });


  }

}

const game = new Game();
//game.render();
