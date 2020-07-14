import './settings.css';
import { initHandlers } from './initHandlers';
import { getUserID } from '../../services/authService';
import { errorWindow } from '../../components/main/errorWindow/errorWindow';
import { getToken } from '../../services/token';
import { header } from '../../components/main/header/header';
import { footer } from '../../components/main/footer/footer';

const body = document.querySelector('body');
header();
const main = document.createElement('main');
const userId = getUserID();
const token = getToken();

if (!userId || !token) {
  errorWindow();
}
main.innerHTML = `
<div class ="container shadow-lg mb-5 mt-10 rounded">
<h2 class="main-title">Мои настройки</h2>
<form>
<div class ="section-wrapper row"><div class="col-auto word-settings"><h4 class ="section-title mt-1 ml-1" >Настройки изучения слов</h4>
<div class="input-group col-auto mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text text-break" id="basic-addon1">Всего карточек в день (максимум 50)</span>
  </div>
  <input type="number" class="form-control all" min="0" max="50" value="">
</div>
<div class="input-group col-auto mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text text-break" id="basic-addon1">Количество новых карточек в день</span>
  </div>
  <input type="number" class="form-control new" min="0" max="50" value="">
</div>
</div></div>
<h4 class ="section-title mt-1" >Настройка кнопок</h4>
<div class="container btn-settings mt-1 ml-1">
</div>
<h4 class ="section-title mt-1" >Настройки информации на карточках</h4>
<div class="container cards-settings mt-1 ml-1">
  
</div>
<button type="submit" class="btn primary btn-lg mt-3">Сохранить</button>
<button type="button" class="btn btn-outline-secondary btn-lg mt-3">Вернуться на главную</button>
</form>
</div>`;
body.appendChild(main);
footer();
initHandlers();
