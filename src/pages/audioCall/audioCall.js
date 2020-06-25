import './audioCall.css';
import questions from './dummyData';






export default class Game {
  constructor() {
    this.round = 0;
    this.isAnswered = false;

    this.GAME = document.createElement('div');
    this.QUESTION_BUTTON = document.createElement('div');
    this.volumeIcon = document.createElement('img');
    this.VARIANTS = document.createElement('div');
    this.NEXT_BUTTON = document.createElement('div');
    this.ANSWER = document.createElement('div');
    this.ANSWER_IMAGE = document.createElement('div');
    this.ANSWER_AUDIO = document.createElement('div');
    this.ANSWER_WORD = document.createElement('div');
    this.ROW = document.createElement('div');
  }

  render() {
    

    this.GAME.classList.add('game');
    this.QUESTION_BUTTON.classList.add('question-button');
    this.volumeIcon.classList.add('question-button__icon');
    this.volumeIcon.setAttribute('src','/assets/images/speaker.png');
    this.VARIANTS.classList.add('variants');
    this.NEXT_BUTTON.classList.add('next-button');
    this.NEXT_BUTTON.innerText = 'NE ZNAYU';

    this.ANSWER.classList.add('answer');
    this.ANSWER_IMAGE.classList.add('answer__image');
    this.ROW.classList.add('row');
    this.ANSWER_AUDIO.classList.add('answer__audio');
    this.ANSWER_WORD.classList.add('answer__word');

    this.ROW.appendChild(this.ANSWER_AUDIO);
    this.ROW.appendChild(this.ANSWER_WORD);
    this.ANSWER.appendChild(this.ANSWER_IMAGE);
    this.ANSWER.appendChild(this.ROW);
    
    this.ANSWER_WORD.innerText = questions[this.round].english;
    this.ANSWER_IMAGE.style.backgroundImage = `url(${questions[this.round].image})`;
    new Audio(questions[this.round].question).play();

    this.QUESTION_BUTTON.appendChild(this.volumeIcon);
    
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
      this.VARIANTS.appendChild(OPTION);

      OPTION.addEventListener('click', () => {
     if (this.isAnswered == false) {
      this.showAnswer()
        let sound;
        if (OPTION.lastChild.innerText == questions[this.round].rightAnswer) {
          sound = new Audio('/assets/audios/correct.mp3');
          OPTION.firstChild.innerHTML = `<img src="/assets/images/24.png" alt="">`;
        } else {
          sound = new Audio('/assets/audios/wrong.mp3');
          const temp = OPTION.lastChild.innerText;
          OPTION.lastChild.innerHTML = `<s>${temp}</s>`
        }
        sound.play();

        
     }
      });
    }

    this.GAME.appendChild(this.QUESTION_BUTTON);
    this.GAME.appendChild(this.VARIANTS);
    this.GAME.appendChild(this.NEXT_BUTTON);

    document.querySelector('.wrapper').appendChild(this.GAME);

    this.QUESTION_BUTTON.addEventListener('click', () => {
      const audio = new Audio(questions[this.round].question);
      audio.play();
    });

    this.NEXT_BUTTON.addEventListener('click', () => {
      if (this.isAnswered) {
        this.nextRound();
      } else {
        this.showAnswer();
      }
      
    })
  }

  showAnswer() {
    this.isAnswered = true;
    const options = document.querySelectorAll('.option');
    options.forEach((option) => {
      if (option.lastChild.innerText != questions[this.round].rightAnswer) {
        option.lastChild.classList.add('fade');
      } 
      option.firstChild.classList.add('fade');
    });

      this.GAME.removeChild(this.QUESTION_BUTTON);
      this.GAME.insertBefore(this.ANSWER, this.GAME.firstChild);
      this.NEXT_BUTTON.innerText = '';
      this.NEXT_BUTTON.innerHTML = `<img src="/assets/images/right-arrow.png" class="next">`;
  }
  

  nextRound() {
    this.round += 1;
    this.isAnswered = false;
    const audio = new Audio(questions[this.round].question);
      audio.play();
    this.GAME.removeChild(this.ANSWER);
    this.GAME.insertBefore(this.QUESTION_BUTTON, this.GAME.firstChild);
    this.NEXT_BUTTON.innerHTML = 'NE ZNAYU';
    this.ANSWER_IMAGE.style.backgroundImage = `url(${questions[this.round].image})`;
    this.ANSWER_WORD.innerText = questions[this.round].english;
    const options = document.querySelectorAll('.option');
      options.forEach((option, i) => {
        option.lastChild.classList.remove('fade');
        option.firstChild.classList.remove('fade');
        option.lastChild.innerHTML = '';
        option.firstChild.innerHTML = '';
        option.firstChild.innerText = i + 1;
        option.lastChild.innerText = questions[this.round].options[i];
      });

    
  }


}




