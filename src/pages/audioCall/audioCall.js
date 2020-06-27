import './audioCall.css';
import questions from './dummyData';

export default class Game {
  constructor() {
    this.round = 0;
    this.isAnswered = false;

    this.game = document.createElement('div');
    this.question_button = document.createElement('div');
    this.volumeIcon = document.createElement('img');
    this.variants = document.createElement('div');
    this.next_button = document.createElement('div');
    this.answer = document.createElement('div');
    this.answer_image = document.createElement('div');
    this.answer_audio = document.createElement('div');
    this.answer_word = document.createElement('div');
    this.row = document.createElement('div');
  }

  render() {
    this.game.classList.add('game');
    this.question_button.classList.add('question-button');
    this.volumeIcon.classList.add('question-button__icon');
    this.volumeIcon.setAttribute('src', '/assets/images/speaker.png');
    this.variants.classList.add('variants');
    this.next_button.classList.add('next-button');
    this.next_button.innerText = 'NE ZNAYU';

    this.answer.classList.add('answer');
    this.answer_image.classList.add('answer__image');
    this.row.classList.add('row');
    this.answer_audio.classList.add('answer__audio');
    this.answer_word.classList.add('answer__word');

    this.row.appendChild(this.answer_audio);
    this.row.appendChild(this.answer_word);
    this.answer.appendChild(this.answer_image);
    this.answer.appendChild(this.row);

    this.answer_word.innerText = questions[this.round].english;
    this.answer_image.style.backgroundImage = `url(${
      questions[this.round].image
    })`;
    new Audio(questions[this.round].question).play();

    this.question_button.appendChild(this.volumeIcon);

    for (let i = 1; i < 7; i += 1) {
      const option = document.createElement('div');
      const option_number = document.createElement('div');
      const option_word = document.createElement('div');
      option.classList.add('option');
      option_number.classList.add('option__number');
      option_word.classList.add('option__word');
      option_number.innerText = i;
      option_word.innerText = questions[this.round].options[i - 1];
      option.appendChild(option_number);
      option.appendChild(option_word);
      this.variants.appendChild(option);

      option.addEventListener('click', () => {
        if (this.isAnswered === false) {
          this.showAnswer();
          let sound;
          if (
            option.lastChild.innerText === questions[this.round].rightAnswer
          ) {
            sound = new Audio('/assets/audios/correct.mp3');
            option.firstChild.innerHTML = '<img src="/assets/images/24.png" alt="">';
          } else {
            sound = new Audio('/assets/audios/wrong.mp3');
            const temp = option.lastChild.innerText;
            option.lastChild.innerHTML = `<s>${temp}</s>`;
          }
          sound.play();
        }
      });
    }

    this.game.appendChild(this.question_button);
    this.game.appendChild(this.variants);
    this.game.appendChild(this.next_button);

    document.querySelector('.wrapper').appendChild(this.game);

    this.question_button.addEventListener('click', () => {
      const audio = new Audio(questions[this.round].question);
      audio.play();
    });
    this.answer_audio.addEventListener('click', () => {
      const audio = new Audio(questions[this.round].question);
      audio.play();
    });

    this.next_button.addEventListener('click', () => {
      if (this.isAnswered) {
        this.nextRound();
      } else {
        this.showAnswer();
      }
    });
  }

  showAnswer() {
    this.isAnswered = true;
    const options = document.querySelectorAll('.option');
    options.forEach((option) => {
      if (option.lastChild.innerText !== questions[this.round].rightAnswer) {
        option.lastChild.classList.add('fade');
      }
      option.firstChild.classList.add('fade');
    });

    this.game.removeChild(this.question_button);
    this.game.insertBefore(this.answer, this.game.firstChild);
    this.next_button.innerText = '';
    this.next_button.innerHTML = '<img src="/assets/images/right-arrow.png" class="next">';
  }

  nextRound() {
    this.round += 1;
    this.isAnswered = false;
    const audio = new Audio(questions[this.round].question);
    audio.play();
    this.game.removeChild(this.answer);
    this.game.insertBefore(this.question_button, this.game.firstChild);
    this.next_button.innerHTML = 'NE ZNAYU';
    this.answer_image.setAttribute(
      'style',
      `background-image:url(${questions[this.round].image})`,
    );
    this.answer_word.innerText = questions[this.round].english;
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

