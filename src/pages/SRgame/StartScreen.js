const createElement = (element, elementClass, elementText) => {
  const el = document.createElement(element);
  el.className = elementClass;
  el.textContent = elementText;
  return el;
};

export default class StartScreen {
  static createScreen() {
    const container = createElement('div', 'start-screen-container');

    const title = createElement('h2', 'games-title', 'Сегодня');

    const gamesContainer = createElement('div', 'games-container');

    const wordsToPractice = createElement('div', 'words-to-practice');
    wordsToPractice.innerHTML += `<h3>Тренировка на сегодня</h3><br><span class="new-number">10 новых</span><span  class="learning-number">10 повторить</span></р>`;

    const optionalContainer = createElement('div', 'optional-games-container');
    const hardWords = createElement('div', 'hard-words');
    hardWords.innerHTML += `<h3>Учить сложные слова</h3><span class="hard-number">20</span>`;

    const newWords = createElement('div', 'new-words');
    newWords.innerHTML += `<h3>Учить новые слова</h3><span class="new-number">20</span>`;

    const learningWords = createElement('div', 'learning-words');
    learningWords.innerHTML += `<h3>Тренировать изучаемые слова</h3><span class="learning-number">20</span>`;

    container.append(title);
    gamesContainer.append(wordsToPractice);
    optionalContainer.append(newWords);
    optionalContainer.append(learningWords);
    optionalContainer.append(hardWords);
    gamesContainer.append(optionalContainer);
    container.append(gamesContainer);

    document.body.append(container);
  }
}
