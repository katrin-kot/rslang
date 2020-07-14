import { createElement } from './helpers';
import { getHardWordsCount, getLearningWordsCount } from '../../services/SRgameWordsService';
import { newWordsPerDay } from './settings';
import {
  renderNewGame, renderHardGame, renderGame, renderLearningGame,
} from './handlers';

export default class StartScreen {
  static async createScreen() {
    document.querySelector('.swiper-button-next').style.display = 'none';
    const hardWordsCount = await getHardWordsCount();
    const learningWordsCount = await getLearningWordsCount();
    const newWordsCount = newWordsPerDay;
    const wrapper = createElement('div', 'start-screen-container-wrapper');
    const container = createElement('div', 'start-screen-container');

    const title = createElement('h2', 'games-title', 'Сегодня');

    const gamesContainer = createElement('div', 'games-container');

    const wordsToPractice = createElement('div', 'words-to-practice');
    wordsToPractice.innerHTML += `<h3>Тренировка на сегодня</h3><br><span class="new-number">${newWordsCount} новых</span><span  class="learning-number">${learningWordsCount} повторить</span></р>`;
    wordsToPractice.addEventListener('click', renderGame);

    const optionalContainer = createElement('div', 'optional-games-container');
    const hardWords = createElement('div', 'hard-words');
    hardWords.innerHTML += `<h3>Учить сложные слова</h3><span class="hard-number">${hardWordsCount}</span>`;
    hardWords.addEventListener('click', renderHardGame);

    const newWords = createElement('div', 'new-words');
    newWords.addEventListener('click', renderNewGame);
    newWords.innerHTML += `<h3>Учить новые слова</h3><span class="new-number">${newWordsCount} слов</span>`;

    const learningWords = createElement('div', 'learning-words');
    learningWords.innerHTML += `<h3>Тренировать изучаемые слова</h3><span class="learning-number">${learningWordsCount} слов</span>`;
    learningWords.addEventListener('click', renderLearningGame);

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
