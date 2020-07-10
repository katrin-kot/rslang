import './spinner.css';

export function hideSpinner() {
  document.querySelector('.spinner').classList.remove('visible');
}

export function showSpinner() {
  document.querySelector('.spinner').classList.add('visible');
}

export function renderSpinner() {
  const body = document.querySelector('body');
  body.insertAdjacentHTML(
    'afterbegin',
    `<div class = 'spinner'><svg class="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340"><circle cx="170" cy="170" r="160" stroke="#E2007C"/>
    <circle cx="170" cy="170" r="135" stroke="#404041"/>
    <circle cx="170" cy="170" r="110" stroke="#E2007C"/>
    <circle cx="170" cy="170" r="85" stroke="#404041"/></svg></div>`,
  );
}
