
export function renderCard(content, settings) {
  const fragment = document.createDocumentFragment();
  const englishWord = document.createElement('h4');
  englishWord.innerHTML = content.data.word;
  fragment.appendChild(englishWord);
  if (settings.transcription === true) {
    const transcription = document.createElement('p');
    transcription.innerHTML = content.data.transcription;
    fragment.appendChild(transcription);
  }
  if (settings.textExample === true) {
    const textExample = document.createElement('p');
    textExample.innerHTML = content.data.textExample;
    fragment.appendChild(textExample);
  }
  if (settings.wordTranslate === true) {
    const translate = document.createElement('p');
    translate.innerHTML = content.data.wordTranslate;
    fragment.appendChild(translate);
  }
  if (settings.image === true) {
    const image = document.createElement('img');
    image.setAttribute('src', content.data.image);
    fragment.appendChild(image);
  }
  if (settings.textMeaning === true) {
    const textMeaning = document.createElement('p');
    textMeaning.innerHTML = content.data.textMeaning;
    fragment.appendChild(textMeaning);
  }
  if (settings.textMeaningTranslate === true) {
    const textMeaningTranslate = document.createElement('p');
    textMeaningTranslate.innerHTML = content.data.textMeaningTranslate;
    fragment.appendChild(textMeaningTranslate);
  }
  if (settings.textExampleTranslate === true) {
    const textExampleTranslate = document.createElement('p');
    textExampleTranslate.innerHTML = content.data.textExampleTranslate;
    fragment.appendChild(textExampleTranslate);
  }
  if (settings.audio === true) {
    const audio = document.createElement('span');
    audio.classList.add('material-icons');
    audio.innerHTML = 'volume_up';
    fragment.appendChild(audio);
  }
  if (settings.audioMeaning === true) {
    const audioMeaning = document.createElement('span');
    audioMeaning.classList.add('material-icons');
    audioMeaning.innerHTML = 'volume_up';
    fragment.appendChild(audioMeaning);
  }
  if (settings.audioExample === true) {
    const audioExample = document.createElement('span');
    audioExample.classList.add('material-icons');
    audioExample.innerHTML = 'volume_up';
    fragment.appendChild(audioExample);
  }
  return fragment;
}
