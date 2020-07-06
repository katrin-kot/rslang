import Chart from 'chart.js';

export function overallStats() {
  const canvasContainer = document.createElement('div');
  const canvas = document.createElement('canvas');
  canvas.id = 'myChart';
  canvas.width = 600;
  canvas.height = 400;

  setTimeout( () => {
    const ctx = document.getElementById('myChart').getContext('2d');

    const data = {
      labels: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
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
          data: [25, 59, 20, 14, 16, 35, 40],
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
