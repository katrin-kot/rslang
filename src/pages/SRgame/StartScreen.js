import { createElement } from './helpers';
import { getHardWordsCount, getLearningWordsCount, getNewWords } from '../../services/SRgameWordsService';
import {
  renderNewGame, renderHardGame, renderGame, renderLearningGame,
  renderNoWordNotification, showNoWordNotification,
} from './handlers';

export default class StartScreen {
  static async createScreen() {
    document.querySelector('.swiper-button-next').style.display = 'none';
    renderNoWordNotification();
    const hardWordsCount = await getHardWordsCount();
    const learningWordsCount = await getLearningWordsCount();
    const words = await getNewWords();
    const newWordsCount = words.length;
    const wrapper = createElement('div', 'start-screen-container-wrapper');
    const container = createElement('div', 'start-screen-container');

    const title = createElement('h2', 'games-title', 'Сегодня');

    const gamesContainer = createElement('div', 'games-container');

    const wordsToPractice = createElement('div', 'words-to-practice');
    wordsToPractice.innerHTML += `<h3>Тренировка на сегодня</h3><br><span class="new-number">Всего: ${newWordsCount}</span><span  class="learning-number">Всего: ${learningWordsCount}</span></р>`;
    wordsToPractice.addEventListener('click', () => {
      if (newWordsCount === 0 && learningWordsCount === 0) {
        showNoWordNotification();
      } else {
        renderGame();
      }
    });

    const optionalContainer = createElement('div', 'optional-games-container');
    const hardWords = createElement('div', 'hard-words');
    hardWords.innerHTML += `<h3>Учить сложные слова</h3><span class="hard-number">Всего: ${hardWordsCount}</span>`;
    hardWords.addEventListener('click', () => {
      if (hardWordsCount === 0) {
        showNoWordNotification();
      } else {
        renderHardGame();
      }
    });

    const newWords = createElement('div', 'new-words');
    newWords.innerHTML += `<h3>Учить новые слова</h3><span class="new-number">Всего: ${newWordsCount}</span>`;
    newWords.addEventListener('click', () => {
      if (newWordsCount === 0) {
        showNoWordNotification();
      } else {
        renderNewGame();
      }
    });

    const learningWords = createElement('div', 'learning-words');
    learningWords.innerHTML += `<h3>Тренировать изучаемые слова</h3><span class="learning-number">Всего: ${learningWordsCount}</span>`;
    learningWords.addEventListener('click', () => {
      if (learningWordsCount === 0) {
        showNoWordNotification();
      } else {
        renderLearningGame();
      }
    });

    container.append(title);
    gamesContainer.append(wordsToPractice);
    optionalContainer.append(newWords);
    optionalContainer.append(learningWords);
    optionalContainer.append(hardWords);
    gamesContainer.append(optionalContainer);
    container.append(gamesContainer);

    wrapper.append(container);

    document.body.append(wrapper);
  }
}
