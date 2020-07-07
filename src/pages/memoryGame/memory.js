import './memory.css';
import difficultOptions from '../../components/main/difficultOptions/difficultOptions';

const body = document.querySelector('body');
body.classList.add('container-fluid');
const form = difficultOptions();
body.insertAdjacentHTML('afterbegin', `<h3>Игра "Найди пару"</h3><div class="memory-card mainCard">
<div class="front-face"><h5>Правила игры:</h5> <p>На столе лежат перемешанные 
карточки изображением вниз. Игрок переворачивает по две карточки. 
Если слово на английском совпало с его переводом карточки обратно не переворачиваются. 
Если карточки не совпали – они переворачиваются обратно, игрок должен запомнить их. 
Зная расположение карточек, он сможет переворачивать правильные. Цель игры: 
перевернуть все карточки, совершив меньше ошибок</p>
<button type="button" class="btn btn-secondary btn-sm">Настройки игры</button></div>
<div class="back-face"></div></div>`);
const settings = document.querySelector('.back-face');
settings.insertAdjacentHTML('afterbegin', form);
const card = document.querySelector('.mainCard');
settings.insertAdjacentHTML('beforeend', '<button type="button" class="btn btn-secondary btn-sm">Правила игры</button>');
card.insertAdjacentHTML('afterend', `<div><button type="button" class="btn btn-primary btn-lg">Играть</button>
<button type="button" class="btn btn-secondary btn-lg">Вернуться к тренировкам</button></div>`);
const formContainer = document.querySelector('form');
formContainer.insertAdjacentHTML('afterbegin', `<div class="input-group mb-3">
<div class="input-group-prepend">
<label class="input-group-text" for="inputGroupSelect01">Количество карточек</label></div>
<select class="custom-select" id="inputGroupSelect01">
  <option selected>Выбирай...</option>
  <option value="1">4</option>
  <option value="2">9</option>
  <option value="3">16</option>
</select>
</div>`);
const smallBtn = document.querySelectorAll('.btn-sm');
function flipCard() {
  card.classList.toggle('flip');
}
smallBtn.forEach((btn) => btn.addEventListener('click', flipCard));