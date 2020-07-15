import Chart from 'chart.js';


let instances = 0;


export function overallStats(dataFromServer, settings) {
  const canvasContainer = document.createElement('div');
  const canvas = document.createElement('canvas');
  canvas.id = `myChart-${instances += 1}`;
  canvas.width = 600;
  canvas.height = 400;

  setTimeout(() => {
    const ctx = document.getElementById(canvas.id).getContext('2d');
    const data = {
      labels: [''].concat(Object.keys(dataFromServer).map((el) => el.split(/[T,\s]/)[1])),
      datasets: [
        {
          label: 'Выученных слов за день',
          fillColor: 'rgba(220,220,220,0.2)',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          backgroundColor: 'rgba(0,100,120,0.8)',
          data: [0].concat(Object.values(dataFromServer).map((el) => {
            if (el.score) {
              const [correct, wrong] = el.score.split('-');
              return +correct + +wrong;
            }
            return 0;
          })),
        },
        {
          label: 'Дневная норма',
          fillColor: 'rgba(220,220,220,0.2)',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          backgroundColor: 'rgba(34,139,34,0.7)',
          data: [settings.wordsPerDay].concat(
            Object.keys(dataFromServer).map(() => settings.wordsPerDay),
          ),
        },
      ],
    };


    return new Chart(ctx, {
      type: 'line',
      data,
    });
  });

  canvasContainer.appendChild(canvas);
  return canvasContainer;
}
