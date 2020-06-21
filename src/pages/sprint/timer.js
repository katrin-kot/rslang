export default class CountdownTimer {
  constructor() {}

  renderTimer() {
    const canvas = document.querySelector('.countdown-timer');
    canvas.width = 150;
    canvas.height = 150;
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, 2 * Math.PI);
    ctx.lineWidth = 8;
    ctx.strokeStyle = 'blue';
    ctx.stroke();

    this.drawSeconds();
  }

  updateTimer(seconds) {
    const canvas = document.querySelector('.countdown-timer');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, 2 * Math.PI);
    ctx.lineWidth = 8;
    ctx.strokeStyle = 'blue';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(
      75,
      75,
      50,
      -Math.PI / 2,
      -Math.PI / 2 + (6 * seconds * Math.PI) / 180
    );
    ctx.lineWidth = 8;
    ctx.strokeStyle = 'grey';
    ctx.stroke();

    this.drawSeconds(seconds);
  }
  drawSeconds(seconds = 0) {
    const canvas = document.querySelector('.countdown-timer');
    const ctx = canvas.getContext('2d');
    const second = 60 - seconds;
    const coordinateX =
      second < 10 ? canvas.width / 2 - 6 : canvas.width / 2 - 15;
    const coordinateY = canvas.height / 2 + 10;
    //const
    ctx.font = '30px Arial';
    ctx.fillText(second, coordinateX, coordinateY);
  }
}
