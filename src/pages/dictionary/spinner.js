import './spinner.css';

export function hideSpinner(main) {
  main.querySelector('.spinner').classList.remove('visible');
}

export function showSpinner(main) {
  main.querySelector('.spinner').classList.add('visible');
}

export function renderSpinner(main) {
  const content = main.querySelector('.words-content');
  content.insertAdjacentHTML(
    'beforeend',
    `<div class = 'spinner'><svg class="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340"><circle cx="170" cy="170" r="160" stroke="#E2007C"/>
    <circle cx="170" cy="170" r="135" stroke="#404041"/>
    <circle cx="170" cy="170" r="110" stroke="#E2007C"/>
    <circle cx="170" cy="170" r="85" stroke="#404041"/></svg></div>`
  );
}
