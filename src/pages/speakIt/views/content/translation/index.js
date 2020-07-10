class TranslationView {
  showTranslation(word) {
    const wordTranslationBlock = document.querySelector('.word-translation');
    wordTranslationBlock.innerHTML = word;
  }

  clearWordTranslation() {
    document.querySelector('.word-translation').innerHTML = '';
  }
}

export default new TranslationView();
