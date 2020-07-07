import { getUserID } from '../../services/authService';
import { getStatistics, putStatistics } from '../../services/statisticsService';

export async function renderStatistic(score, error) {
  const userId = getUserID();
  let countError;
  if (!error) {
    countError = 0;
  } else {
    countError = error.length;
  }
  const statistic = await getStatistics({ userId });
  if (!statistic.optional.memoryGame) {
    statistic.optional = { memoryGame: {} };
  }
  delete statistic.id;
  const date = new Date();
  const right = localStorage.getItem('count') / 2 - countError;
  const level = localStorage.getItem('group');
  statistic.optional.memoryGame[date.toLocaleString()] = {
    level,
    score: `${right}-${countError}`,
    scoreGame: score,
    errors: countError,
  };
  await putStatistics({ userId, statistic });
  const result = await getStatistics({ userId });
  const tab = document.querySelector('.msg');
  tab.insertAdjacentHTML(
    'beforeend',
    ` <table class="table table-striped overflow-auto">
    <caption>Статистика по дням</caption>
    <thead>
      <tr>
        <th scope="col">День/время</th>
        <th scope="col">Уровень сложности</th>
        <th scope="col">Результат</th>
        <th scope="col">Кол-во ошибок</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
    `,
  );
  const tbody = tab.querySelector('tbody');
  const arrRes = Object.entries(result.optional.memoryGame);
  arrRes.forEach((elem) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${elem[0]}</td>
    <td>${elem[1].level}</td>
    <td>${elem[1].scoreGame}</td>
    <td>${elem[1].errors}</td>`;
    tbody.appendChild(row);
  });
}
