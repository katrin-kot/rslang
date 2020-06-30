import './header.css';
import user from './images/avatar.png';

export function header() {
  const headerElem = document.createElement('div');
  headerElem.className = 'header';
  const title = document.createElement('h1');
  const avatar = document.createElement('div');
  const img = document.createElement('img');
  img.className = 'user';
  img.setAttribute('src', user);
  avatar.appendChild(img);
  title.className = 'title';
  title.innerText = 'Статистика';
  headerElem.appendChild(title);
  headerElem.appendChild(avatar);
  return headerElem;
}
