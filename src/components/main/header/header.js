import './header.css';
import { checkUserLoginWithoutWindow } from '../../../services/verifyUserService';
import { logoutUser } from '../../../services/authService';

const toggleMenuClasses = () => {
  const burgerMenu = document.querySelector('.burger-menu');
  const navMenu = document.querySelector('.header-wrap');
  const userMenu = document.querySelector('.user-profile');

  document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('burger-menu')) {
      burgerMenu.classList.add('selected');
      navMenu.classList.add('selected');
    } else {
      burgerMenu.classList.remove('selected');
      navMenu.classList.remove('selected');
    }

    if (
      userMenu.classList.contains('authorized')
      || userMenu.classList.contains('unauthorized')
    ) {
      if (event.target.parentNode.classList.contains('user-profile')) {
        userMenu.classList.toggle('selected');
      } else if (userMenu.classList.contains('selected')) {
        userMenu.classList.remove('selected');
      }
    }
  });
};

const refreshPage = () => {
  window.location.reload(true);
};

const logout = () => {
  const logoutDiv = document.querySelector('.logout');

  logoutDiv.addEventListener('click', () => {
    logoutUser();
    refreshPage();
  });
};
const selectCurrentPage = () => {
  const links = document.querySelectorAll('header a');

  links.forEach((link) => {
    if (link.getAttribute('href') === window.location.pathname) {
      link.parentElement.classList.add('selected');
    }
  });
};

const checkAuthorization = async () => {
  const login = await checkUserLoginWithoutWindow();
  const result = login ? 'authorized' : 'unauthorized';

  return result;
};

const updateUserMenu = async () => {
  const userMenu = document.querySelector('.user-profile');
  const userStatus = await checkAuthorization();

  userMenu.classList.add(userStatus);
};

export const header = () => {
  const body = document.querySelector('body');
  const headerBlock = `
    <header class="site-header">
    <div class="site-profile">
      <a class="site-logo" href="/"></a>
    </div>
    <div class="burger-menu"></div>
    <div class="header-wrap">
      <span class="decor"></span>
      <nav>
        <ul class="primary">
          <li>
            <a href="/index.html">Главная</a>
          </li>
          <li>
            <a href="/dictionary.html">Словарь</a>
            <ul class="sub"></ul>
          </li>
          <li>
            <a class="menu-link">Миниигры</a>
            <ul class="sub">
              <li><a href="/SRgame.html">Spaced repetition</a></li>
              <li><a href="/speakIt.html">SpeakIt</a></li>
              <li><a href="/audioCall.html">AudioCall</a></li>
              <li><a href="/memory.html">Memory</a></li>
              <li><a href="/savanna.html">Savanna</a></li>
              <li><a href="/sprint.html">Sprint</a></li>
            </ul>
          </li>
          <li>
            <a href="/statistic.html">Статистика</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="user-profile">
        <a class="user-logo"></a>
        <div class="user-settings-block">
          <div class="authorized-block">
            <a href="/settings.html">Настройки</a>
            <div class="logout">Выйти</div>
          </div>
          <div class="unauthorized-block">
            <a href="/">Войти</a>
          </div>
        </div>
    </div>
  </header>`;

  body.insertAdjacentHTML('afterbegin', headerBlock);

  toggleMenuClasses();
  selectCurrentPage();
  updateUserMenu();
  logout();
};
