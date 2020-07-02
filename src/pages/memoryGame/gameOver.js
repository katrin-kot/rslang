import { getUserID } from '../../services/authService';

export function gameOver(score, words, error) {
  const userId = getUserID();
  const finalScore = document.querySelector('.score');
  finalScore.innerHTML = score;
  const gameField = document.querySelector('.memory-game');
  gameField.innerHTML = `<div class ='game-over'><p class ='final-text'>Вы набрали ${score} баллов</p><h3>Правильные ответы</h3></div>`;
  const table = document.createElement('table');
  table.classList.add('table', 'table-hover');
  table.insertAdjacentHTML('afterbegin', ` <thead><tr>
  <th scope="col">Слово</th>
  <th scope="col">Перевод</th></tr></thead><tbody></tbody>`);
  const tbody = table.querySelector('tbody');
  words.forEach((elem) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${elem.word}</td><td>${elem.wordTranslate}</td>`;
    tbody.appendChild(row);
  });
  if (score === 0) {
    const countError = error.length;
    const final = document.querySelector('.final-text');
    const errortext = error.join();
    final.innerHTML = `Вы набрали 0 баллов. Тренируйтесь больше. Не угаданы слова: ${errortext} `;
  }
  //   const statistic = getStatistics({ userId });
  //   const date = new Date();
  //   statistic.optional.memory.push({ date: date.getTime(), score, errors: error });
  //   const optional = {
  //     learnedWords: statistic.learnedWords,
  //     optional: {
  //       ...statistic.optional,
  //     },
  //   };

  //   putStatistic({ userId, optional });
  document.querySelector('.game-over').appendChild(table);
}
