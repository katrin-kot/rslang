import { renderPlayPage } from './playPage';
import { renderStatistic } from './renderStatistic';
import { getUserWord } from '../../services/userWordService';
import { getUserID } from '../../services/authService';
import { createWordWithError, updateWordWithError } from '../../services/SRgameWordsService';


export function gameOver(score, words, error) {
  const userId = getUserID();
  const finalScore = document.querySelector('.score');
  finalScore.innerHTML = score;
  const gameField = document.querySelector('.memory-game');
  gameField.innerHTML = `<div class ='game-over'>
  <p class ='final-text'>Вы набрали ${score} баллов</p>
  <h3>Правильные ответы</h3></div>`;
  const table = document.createElement('table');
  table.classList.add('table', 'table-hover', 'overflow-auto');
  table.insertAdjacentHTML(
    'afterbegin',
    ` <thead><tr>
  <th scope="col">Слово</th>
  <th scope="col">Перевод</th></tr></thead><tbody></tbody>`
  );
  const tbody = table.querySelector('tbody');
  words.forEach((elem) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${elem.word}</td><td>${elem.wordTranslate}</td>`;
    tbody.appendChild(row);
  });
  if (score === 0) {
    const final = document.querySelector('.final-text');
    const errortext = error.join();
    final.innerHTML = `Вы набрали 0 баллов. Тренируйтесь больше. Не угаданы слова: <span>${errortext}</span> `;
  }
  document.querySelector('.game-over').appendChild(table);
  table.insertAdjacentHTML(
    'beforebegin',
    `
  <div class="hidden msg">
  <div class="btn">
    Статистика
  </div>
</div>
  `
  );
  table.insertAdjacentHTML(
    'afterend',
    `
<button type="button" class="btn btn-outline-secondary">Повторить раунд</button>
<button type="button" class="btn btn-outline-primary">Следующий раунд</button>
  `
  );
  const group = localStorage.getItem('group');
  const count = localStorage.getItem('count');
  let page = localStorage.getItem('memory-page');
  document
    .querySelector('.btn-outline-secondary')
    .addEventListener('click', () => {
      renderPlayPage(group, count, page);
    });
  document
    .querySelector('.btn-outline-primary')
    .addEventListener('click', () => {
      page = Number(page) + 1;
      localStorage.setItem('memory-page', page);
      renderPlayPage(group, count, page);
    });
  const msg = document.querySelector('.msg');
  msg.querySelector('.btn').addEventListener('click', (event) => {
    event.target.parentNode.classList.toggle('hidden');
  });
  debugger
  if (Array.isArray(window.idError)) {
    window.idError.forEach(async (elem) => {
      try {
        await getUserWord({ userId, wordId: elem });
        updateWordWithError({ wordId: elem });
      } catch (err) {
        createWordWithError({ wordId: elem });
      }
    });
  }
  renderStatistic(score, error);
}
