import Chart from 'chart.js';


let instances = 0;


export function overallStats(dataFromServer) {
  const canvasContainer = document.createElement('div');
  const canvas = document.createElement('canvas');
  canvas.id = 'myChart-' + instances++;
  canvas.width = 600;
  canvas.height = 400;

  setTimeout( () => {
    const ctx = document.getElementById(canvas.id).getContext('2d');
    const data = {
      labels: Object.keys(dataFromServer).map(el => el.split(",")[1]),
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
          data: Object.values(dataFromServer).map(el => {
            const [correct, wrong] = el.score.split("-")
            return +correct + +wrong
          }),
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
          data: [40, 40, 40, 40, 40, 40, 40],
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
