import { msToTime, playAudio } from './sideFunctions';
import { updateUserWord } from '../../services/userWordService';
import { getUserID } from '../../services/authService';

export function renderCard(content, settings) {
  const userId = getUserID();
  const fragment = document.createDocumentFragment();
  const englishWord = document.createElement('h5');
  englishWord.classList.add('english-word');
  englishWord.innerHTML = content.data.word;
  const explanation = document.createElement('div');
  explanation.classList.add('explanation');
  explanation.classList.add('col-12');
  explanation.classList.add('col-sm-8');
  explanation.appendChild(englishWord);
  fragment.appendChild(explanation);
  if (settings.transcription === true) {
    const transcription = document.createElement('p');
    transcription.classList.add('transcription');
    transcription.innerHTML = content.data.transcription;
    explanation.appendChild(transcription);
  }
  if (settings.showDelete === true) {
    const deleteBtn = document.createElement('span');
    deleteBtn.classList.add('btn-delete');
    const deleteIcon = document.createElement('span');
    deleteIcon.classList.add('material-icons');
    if (content.optional.status === 'delete') {
      deleteIcon.innerHTML = 'restore_from_trash';
      deleteBtn.addEventListener('click', (event) => {
        event.target.closest('.word-card').remove();
        // eslint-disable-next-line no-param-reassign
        content.optional.status = 'to_study';
        const word = {
          difficulty: content.difficulty,
          optional: content.optional,
        };
        updateUserWord({ userId, wordId: content.wordId, word });
      });
    } else {
      deleteIcon.innerHTML = 'delete';
      deleteBtn.addEventListener('click', (event) => {
        event.target.closest('.word-card').remove();
        // eslint-disable-next-line no-param-reassign
        content.optional.status = 'delete';
        const word = {
          difficulty: content.difficulty,
          optional: content.optional,
        };
        updateUserWord({ userId, wordId: content.wordId, word });
      });
    }
    deleteBtn.appendChild(deleteIcon);
    explanation.appendChild(deleteBtn);
  }
  if (settings.moveinHard === true) {
    const hardBtn = document.createElement('button');
    hardBtn.classList.add('btn');
    hardBtn.classList.add('btn-outline-secondary');
    hardBtn.classList.add('btn-sm');
    hardBtn.setAttribute('type', 'button');
    if (content.optional.status === 'hard') {
      hardBtn.innerHTML = 'На изучение';
      hardBtn.addEventListener('click', (event) => {
        event.target.closest('.word-card').remove();
        // eslint-disable-next-line no-param-reassign
        content.optional.status = 'to_study';
        const word = {
          difficulty: content.difficulty,
          optional: content.optional,
        };
        updateUserWord({ userId, wordId: content.wordId, word });
      });
    } else {
      hardBtn.innerHTML = 'В сложные';
      hardBtn.addEventListener('click', (event) => {
        event.target.closest('.word-card').remove();
        // eslint-disable-next-line no-param-reassign
        content.optional.status = 'hard';
        const word = {
          difficulty: content.difficulty,
          optional: content.optional,
        };
        updateUserWord({ userId, wordId: content.wordId, word });
      });
    }
    explanation.appendChild(hardBtn);
  }

  if (settings.audio === true) {
    const playBtn = document.createElement('span');
    playBtn.classList.add('btn-play');
    playBtn.addEventListener('click', () => playAudio(content.data.audio));
    const audio = document.createElement('span');
    audio.classList.add('material-icons');
    audio.innerHTML = 'volume_up';
    playBtn.appendChild(audio);
    explanation.appendChild(playBtn);
  }
  if (settings.wordTranslate === true) {
    const translate = document.createElement('p');
    translate.innerHTML = content.data.wordTranslate;
    explanation.appendChild(translate);
  }
  if (settings.textExample === true) {
    const textExample = document.createElement('p');
    textExample.innerHTML = content.data.textExample;
    explanation.appendChild(textExample);
  }
  if (settings.audioExample === true) {
    const playBtn = document.createElement('span');
    playBtn.classList.add('btn-play');
    playBtn.addEventListener('click', () => playAudio(content.data.audioExample));
    const audioExample = document.createElement('span');
    audioExample.classList.add('material-icons');
    audioExample.innerHTML = 'volume_up';
    playBtn.appendChild(audioExample);
    explanation.appendChild(playBtn);
  }
  if (settings.textExampleTranslate === true) {
    const textExampleTranslate = document.createElement('p');
    textExampleTranslate.innerHTML = content.data.textExampleTranslate;
    explanation.appendChild(textExampleTranslate);
  }
  if (settings.textMeaning === true) {
    const textMeaning = document.createElement('p');
    textMeaning.innerHTML = content.data.textMeaning;
    explanation.appendChild(textMeaning);
  }
  if (settings.audioMeaning === true) {
    const playBtn = document.createElement('span');
    playBtn.classList.add('btn-play');
    playBtn.addEventListener('click', () => playAudio(content.data.audioMeaning));
    const audioMeaning = document.createElement('span');
    audioMeaning.classList.add('material-icons');
    audioMeaning.innerHTML = 'volume_up';
    playBtn.appendChild(audioMeaning);
    explanation.appendChild(playBtn);
  }
  if (settings.textMeaningTranslate === true) {
    const textMeaningTranslate = document.createElement('p');
    textMeaningTranslate.innerHTML = content.data.textMeaningTranslate;
    explanation.appendChild(textMeaningTranslate);
  }
  const wrapper = document.createElement('div');
  wrapper.classList.add('col-12');
  wrapper.classList.add('col-sm-4');
  fragment.appendChild(wrapper);
  if (settings.image === true) {
    const image = document.createElement('img');
    image.setAttribute('src', content.data.image);
    image.classList.add('card-image');
    wrapper.appendChild(image);
  }
  const statistic = document.createElement('div');
  statistic.classList.add('statistic');
  if (!content.optional.date) {
    statistic.innerHTML = '<h5>Данное слово ещё не появлялось в основной игре</h5>';
  } else {
    const date = new Date();
    const time = date.getTime() - content.optional.date;
    const timeText = msToTime(time);
    statistic.innerHTML = `<h5>Давность: ${timeText} назад | Повторений: ${content.optional.count}</h5>`;
  }
  explanation.appendChild(statistic);
  const progress = document.createElement('div');
  progress.classList.add('progress');
  if (!content.optional.value) {
    // eslint-disable-next-line no-param-reassign
    content.optional.value = 0;
  }
  progress.innerHTML = `<div class="progress-bar" role="progressbar" style="width: ${content.optional.value}%;" aria-valuenow="${content.optional.value}" aria-valuemin="0" aria-valuemax="100">${content.optional.value}%</div>
  </div>`;
  explanation.appendChild(progress);
  return fragment;
}
