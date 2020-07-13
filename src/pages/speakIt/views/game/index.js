class GameView {
  checkWord(spokenWord) {
    const wordBlock = document.querySelector(`[data-word="${spokenWord.toLowerCase()}"][data-answer="0"]`);
    return wordBlock;
  }

  setRightAnswer(spokenWord) {
    document.querySelector(`[data-word="${spokenWord.toLowerCase()}`).dataset.answer = 1;
  }

  addWordInInput(spokenWord) {
    document.querySelector('.spoken-word').value = spokenWord;
  }

  clearWordInInput() {
    document.querySelector('.spoken-word').value = '';
  }

  setResult(score, quantityWords) {
    const rightAnswers = document.querySelector('.progress-bar__right-answer');
    rightAnswers.innerHTML = score;
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = `${(score / quantityWords) * 100}%`;
  }

  resetResult() {
    document.querySelector('.progress-bar').style.width = '0%';
    document.querySelector('.progress-bar__right-answer').innerHTML = 0;
  }

  resetCardsDataAnswer() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      card.setAttribute('data-answer', 0);
    });
  }

  clearTranslationArea() {
    document.querySelector('.word-translation').innerHTML = '';
  }

  hideSoundExample() {
    document.querySelector('.sound-example').classList.add('hidden');
  }

  removeContentWrapper() {
    document.querySelector('.speakIt__content__wrapper').remove();
  }

  showHideCongratulations() {
    document.querySelector('.user-congratulation__wrapper').classList.toggle('hidden');
  }

  resetProgress() {
    this.clearTranslationArea();
    this.hideSoundExample();
    this.clearWordInInput();
    document.querySelector('.spoken-word').classList.add('none');
    document.querySelector('.word-translation').classList.remove('none');
    this.resetResult();
  }
}

export default new GameView();
