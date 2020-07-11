import './header.css';

const toggleClasses = () => {
  const burgerMenu = document.querySelector('.burger-menu');
  const navMenu = document.querySelector('.header-wrap');

  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('burger-menu')) {
      burgerMenu.classList.add('selected');
      navMenu.classList.add('selected');
    } else {
      burgerMenu.classList.remove('selected');
      navMenu.classList.remove('selected');
    }
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

export const header = () => {
  const body = document.querySelector('body');
  const headerBlock = `
    <header>
    <div class="site-profile">
      <a class="site-logo" href="/"></a>
    </div>
    <div class="burger-menu"></div>
    <div class="header-wrap">
      <span class="decor"></span>
      <nav>
        <ul class="primary">
          <li>
            <a href="/main.html">Главная</a>
          </li>
          <li>
            <a href="/dictionary.html">Словарь</a>
            <ul class="sub"></ul>
          </li>
          <li>
            <a href="">Миниигры</a>
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
      <a class="user-logo" href="/settings.html"></a>
    </div>
  </header>`;

  body.insertAdjacentHTML('afterbegin', headerBlock);

  toggleClasses();
  selectCurrentPage();
};
