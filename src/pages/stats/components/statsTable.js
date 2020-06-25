import Chart from 'chart.js';

export function statsTable() {
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    const canvasEl = document.createElement('canvas');
    canvasEl.id = 'canvas';
    document.addEventListener('DOMContentLoaded', function(e) {
        const colors = {
            purple: {
                default: "rgba(149, 76, 233, 1)",
                half: "rgba(149, 76, 233, 0.5)",
                quarter: "rgba(149, 76, 233, 0.25)",
                zero: "rgba(149, 76, 233, 0)"
            },
            indigo: {
                default: "rgba(80, 102, 120, 1)",
                quarter: "rgba(80, 102, 120, 0.25)"
            }
        };

        const weight = [60.0, 60.2, 59.1, 101.4, 29.9, 80.2, 130.8, 58.6, 59.6, 59.2];

        const labels = [
            "Неделя 1",
            "Неделя 2",
            "Неделя 3",
            "Неделя 4",
            "Неделя 5",
            "Неделя 6",
            "Неделя 7",
            "Неделя 8",
            "Неделя 9",
            "Неделя 10"
        ];

        const ctx = document.getElementById("canvas").getContext("2d");
        ctx.canvas.height = 100;

        let gradient = ctx.createLinearGradient(0, 25, 0, 300);
        gradient.addColorStop(0, colors.purple.half);
        gradient.addColorStop(0.35, colors.purple.quarter);
        gradient.addColorStop(1, colors.purple.zero);

        const options = {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        fill: true,
                        backgroundColor: gradient,
                        pointBackgroundColor: colors.purple.default,
                        borderColor: colors.purple.default,
                        data: weight,
                        lineTension: 0.2,
                        borderWidth: 2,
                        pointRadius: 3
                    }
                ]
            },
            options: {
                layout: {
                    padding: 10
                },
                responsive: true,
                legend: {
                    display: false
                },

                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                padding: 10,
                                autoSkip: false,
                                maxRotation: 15,
                                minRotation: 15
                            }
                        }
                    ],
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: "Статистика по неделям",
                                padding: 10
                            },
                            gridLines: {
                                display: true,
                                color: colors.indigo.quarter
                            },
                            ticks: {
                                beginAtZero: false,
                                max: 300,
                                min: 0,
                                padding: 10
                            }
                        }
                    ]
                }
            }
        };

        window.onload = function () {
            window.myLine = new Chart(ctx, options);
            Chart.defaults.global.defaultFontColor = colors.indigo.default;
            Chart.defaults.global.defaultFontFamily = "Fira Sans";
        };

    })
    wrapper.appendChild(canvasEl)
    return wrapper;
}