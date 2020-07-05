import difficultOptions from '../../components/main/difficultOptions/difficultOptions';

export function renderStartPage() {
  const body = document.querySelector('body');
  body.innerHTML = '';
  body.classList.add('container-fluid');
  const form = difficultOptions();
  body.insertAdjacentHTML(
    'afterbegin',
    `<h3>Игра "Найди пару"</h3>
    <div class="memory-card mainCard">
      <div class="front-face"><h5>Правила игры:</h5> <p>На столе лежат перемешанные 
  карточки изображением вниз. Игрок переворачивает по две карточки. 
  Если слово на английском совпало с его переводом карточки обратно не переворачиваются. 
  Если карточки не совпали – они переворачиваются обратно, игрок должен запомнить их. 
  Зная расположение карточек, он сможет переворачивать правильные. Цель игры: 
  перевернуть все карточки, совершив меньше ошибок</p>
  <button type="button" class="btn btn-secondary btn-sm">Настройки игры</button></div>
  <div class="back-face"></div></div>`,
  );
  const settings = document.querySelector('.back-face');
  settings.insertAdjacentHTML('afterbegin', form);
  const card = document.querySelector('.mainCard');
  settings.insertAdjacentHTML(
    'beforeend',
    '<button type="button" class="btn btn-secondary btn-sm">Правила игры</button>',
  );
  card.insertAdjacentHTML(
    'afterend',
    `
  <button type="button" class="btn btn-secondary btn-lg">Вернуться к тренировкам</button></div>`,
  );
  const formContainer = document.querySelector('form');
  formContainer.insertAdjacentHTML(
    'afterbegin',
    `<div class="input-group mb-3">
  <div class="input-group-prepend">
  <label class="input-group-text" for="inputGroupSelect01">Количество карточек</label></div>
  <select class="custom-select" id="inputGroupSelect01" required>
    <option value ="">Выбирай...</option>
    <option value="1">4</option>
    <option value="2">44</option>
    <option value="3">8</option>
    <option value="4">10</option>
    <option value="5">12</option>
    <option value="6">14</option>
    <option value="7">16</option>
  </select>
  </div> <div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text text-break" id="basic-addon1">Раунд</span>
  </div>
  <input type="number" class="form-control new col-3 col-sm-5" min="1" max="30" value="1">
</div>`,
  );
  if (localStorage.getItem('memory-page')) {
    document.querySelector('.form-control').value = Number(localStorage.getItem('memory-page')) + 1;
  }

  formContainer.insertAdjacentHTML(
    'beforeend',
    '<div><button type="submit" class="btn btn-primary btn-lg">Играть</button>',
  );
}
