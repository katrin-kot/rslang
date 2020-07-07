import Chart from 'chart.js';



let instances = 0;

export function statsTable() {
  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';
  const canvasEl = document.createElement('canvas');
  canvasEl.id = 'stats-table-' + instances++;
  setTimeout(() => {
    const colors = {
      purple: {
        default: 'rgba(149, 76, 233, 1)',
        half: 'rgba(149, 76, 233, 0.5)',
        quarter: 'rgba(149, 76, 233, 0.25)',
        zero: 'rgba(149, 76, 233, 0)',
      },
      indigo: {
        default: 'rgba(80, 102, 120, 1)',
        quarter: 'rgba(80, 102, 120, 0.25)',
      },
    };

    const wordsLearned = [232, 170, 120, 101, 123, 180, 280, 65, 100, 99];

    const labels = [
      'Неделя 1',
      'Неделя 2',
      'Неделя 3',
      'Неделя 4',
      'Неделя 5',
      'Неделя 6',
      'Неделя 7',
      'Неделя 8',
      'Неделя 9',
      'Неделя 10',
    ];

    const ctx = document.getElementById(canvasEl.id).getContext('2d');
    ctx.canvas.height = 100;

    const gradient = ctx.createLinearGradient(0, 25, 0, 300);
    gradient.addColorStop(0, colors.purple.half);
    gradient.addColorStop(0.35, colors.purple.quarter);
    gradient.addColorStop(1, colors.purple.zero);

    const options = {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            fill: true,
            backgroundColor: gradient,
            pointBackgroundColor: colors.purple.default,
            borderColor: colors.purple.default,
            data: wordsLearned,
            lineTension: 0.2,
            borderWidth: 2,
            pointRadius: 3,
          },
        ],
      },
      options: {
        layout: {
          padding: 10,
        },
        responsive: true,
        legend: {
          display: false,
        },

        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                padding: 10,
                autoSkip: false,
                maxRotation: 15,
                minRotation: 15,
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Статистика по неделям',
                padding: 10,
              },
              gridLines: {
                display: true,
                color: colors.indigo.quarter,
              },
              ticks: {
                beginAtZero: false,
                max: 300,
                min: 0,
                padding: 10,
              },
            },
          ],
        },
      },
    };

      setTimeout(function onLoad() {
      window.myLine = new Chart(ctx, options);
      Chart.defaults.global.defaultFontColor = colors.indigo.default;
      Chart.defaults.global.defaultFontFamily = 'Fira Sans';
    });
  });
  wrapper.appendChild(canvasEl);
  return wrapper;
}
