import { msToTime, playAudio, renderIcon } from './helpers';
import { updateUserWord } from '../../services/userWordService';
import { getUserID } from '../../services/authService';


export function renderCard(content, settings) {
  const userId = getUserID();
  const changeStatus = (status) => (event) => {
    event.target.closest('.word-card').remove();
    const word = {
      difficulty: content.difficulty,
      optional: {
        ...content.optional,
        status,
      },
    };
    updateUserWord({ userId, wordId: content.wordId, word });
  };
  const fragment = document.createDocumentFragment();
  const {
    word, transcription, audio, wordTranslate, textExample, audioExample,
    textExampleTranslate, textMeaning, audioMeaning, textMeaningTranslate, image,
  } = content.data;
  const englishWord = document.createElement('h5');
  englishWord.classList.add('english-word');
  englishWord.innerHTML = word;
  const explanation = document.createElement('div');
  explanation.classList.add('explanation', 'col-12', 'col-sm-8');
  explanation.appendChild(englishWord);
  fragment.appendChild(explanation);
  if (settings.transcription) {
    const transcript = document.createElement('p');
    transcript.classList.add('transcription');
    transcript.innerHTML = transcription;
    explanation.appendChild(transcript);
  }
  if (settings.showDelete) {
    const deleteBtn = document.createElement('span');
    deleteBtn.classList.add('btn-delete');
    let nameIcon;
    if (content.optional.status === 'delete') {
      nameIcon = 'restore_from_trash';
      deleteBtn.addEventListener('click', changeStatus('to_study'));
    } else {
      nameIcon = 'delete';
      deleteBtn.addEventListener('click', changeStatus('delete'));
    }
    deleteBtn.appendChild(renderIcon(nameIcon));
    explanation.appendChild(deleteBtn);
  }
  if (settings.moveinHard) {
    const hardBtn = document.createElement('button');
    hardBtn.classList.add('btn', 'btn-outline-secondary', 'btn-sm');
    hardBtn.setAttribute('type', 'button');
    if (content.optional.status === 'hard') {
      hardBtn.innerHTML = 'На изучение';
      hardBtn.addEventListener('click', changeStatus('to_study'));
    } else {
      hardBtn.innerHTML = 'В сложные';
      hardBtn.addEventListener('click', changeStatus('hard'));
    }
    explanation.appendChild(hardBtn);
  }

  if (settings.audio) {
    const playBtn = document.createElement('span');
    playBtn.classList.add('btn-play');
    playBtn.addEventListener('click', () => playAudio(audio));
    playBtn.appendChild(renderIcon('volume_up'));
    explanation.appendChild(playBtn);
  }
  if (settings.wordTranslate) {
    const translate = document.createElement('p');
    translate.innerHTML = wordTranslate;
    explanation.appendChild(translate);
  }
  if (settings.textExample) {
    const exampleText = document.createElement('p');
    exampleText.innerHTML = textExample;
    explanation.appendChild(exampleText);
  }
  if (settings.audioExample) {
    const playBtn = document.createElement('span');
    playBtn.classList.add('btn-play');
    playBtn.addEventListener('click', () => playAudio(audioExample));
    playBtn.appendChild(renderIcon('volume_up'));
    explanation.appendChild(playBtn);
  }
  if (settings.textExampleTranslate) {
    const exampleTranslate = document.createElement('p');
    exampleTranslate.innerHTML = textExampleTranslate;
    explanation.appendChild(exampleTranslate);
  }
  if (settings.textMeaning) {
    const meaning = document.createElement('p');
    meaning.innerHTML = textMeaning;
    explanation.appendChild(meaning);
  }
  if (settings.audioMeaning) {
    const playBtn = document.createElement('span');
    playBtn.classList.add('btn-play');
    playBtn.addEventListener('click', () => playAudio(audioMeaning));
    playBtn.appendChild(renderIcon('volume_up'));
    explanation.appendChild(playBtn);
  }
  if (settings.textMeaningTranslate) {
    const meaningTranslate = document.createElement('p');
    meaningTranslate.innerHTML = textMeaningTranslate;
    explanation.appendChild(meaningTranslate);
  }
  const wrapper = document.createElement('div');
  wrapper.classList.add('col-12', 'col-sm-4');
  fragment.appendChild(wrapper);
  if (settings.image === true) {
    const img = document.createElement('img');
    img.setAttribute('src', image);
    img.classList.add('card-image');
    wrapper.appendChild(img);
  }
  const statistic = document.createElement('div');
  statistic.classList.add('statistic');
  if (!content.optional.date) {
    statistic.innerHTML = '<h5>Данное слово ещё не появлялось в основной игре</h5>';
  } else {
    const date = new Date();
    const time = date.getTime() - content.optional.date;
    const timeText = msToTime(time);
    const nextDate = new Date(content.optional.dateToShow).getTime() - date.getTime();
    const nextTime = msToTime(nextDate);
    statistic.innerHTML = `<h5>Давность: ${timeText} назад | Повторений: ${content.optional.count} | Повторится через: ${nextTime}</h5>`;
  }
  explanation.appendChild(statistic);
  const progress = document.createElement('div');
  progress.classList.add('progress');
  const progressValue = content.optional.value || 0;
  progress.innerHTML = `<div class="progress-bar" role="progressbar" style="width: ${progressValue}%;" aria-valuenow="${progressValue}" aria-valuemin="0" aria-valuemax="100">${progressValue}%</div>
  </div>`;
  explanation.appendChild(progress);
  progress.insertAdjacentHTML(
    'afterend',
    `<ul class="dots-progress"><li class='dot'></li><li class='dot'></li><li class='dot'></li>
  <li class ='dot'></li><li class ='dot'></li></ul>`,
  );
  if (progressValue === 0) {
    explanation.querySelector('.dots-progress').classList.add('progress--1');
  }
  if (progressValue > 0 && progressValue <= 30) {
    explanation.querySelector('.dots-progress').classList.add('progress--2');
  }
  if (progressValue > 30 && progressValue <= 60) {
    explanation.querySelector('.dots-progress').classList.add('progress--3');
  }
  if (progressValue > 60 && progressValue <= 90) {
    explanation.querySelector('.dots-progress').classList.add('progress--4');
  }
  if (progressValue > 90 && progressValue <= 100) {
    explanation.querySelector('.dots-progress').classList.add('progress--5');
  }
  return fragment;
}
