export function msToTime(duration) {
  let minutes = parseInt(((duration / (1000 * 60)) % 60), 10);
  let hours = parseInt(((duration / (1000 * 60 * 60)) % 24), 10);

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours} часов ${minutes} минут`;
}

export function playAudio(src) {
  if (!src) return;
  const myAudio = new Audio();
  myAudio.src = src;
  myAudio.play();
}
