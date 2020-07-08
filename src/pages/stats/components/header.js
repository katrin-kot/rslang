import './header.css';
import user from './images/avatar.png';

export function header() {
  const headerElem = document.createElement('div');
  headerElem.className = 'header';
  headerElem.innerHTML = `
    <h1 class="title">Статистика</h1>
    <div class="avatar">
        <img class="user" src="${user}" alt="">
    </div>
  `
  return headerElem;
}
