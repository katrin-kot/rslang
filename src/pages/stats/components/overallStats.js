import Chart from 'chart.js';

export function overallStats(image, repetition) {
    const canvasContainer = document.createElement('div');
    const canvas = document.createElement('canvas');
    canvas.id = 'myChart';
    canvas.width = 600;
    canvas.height = 400;

    document.addEventListener('DOMContentLoaded', function(e) {
        let ctx = document.getElementById("myChart").getContext("2d");

        let data = {
            labels: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье",],
            datasets: [
                {
                    label: "Выученных слов за день",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    backgroundColor: 'rgba(0,100,120,0.5)',
                    data: [25, 59, 20, 14, 16, 35, 40]
                },
                {
                    label: "Дневная норма",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    backgroundColor: 'rgba(34,139,34,0.7)',
                    data: [40, 40, 40, 40, 40, 40, 40]
                }
            ]
        };


        let myNewChart = new Chart(ctx , {
            type: "line",
            data: data,
        });
})

    canvasContainer.appendChild(canvas)
    return canvasContainer;
}