import './errorWindow.css';

export default (
  errorText = 'Ошибка авторизации. Необходимо войти в учётную запись.',
  buttonText = 'Авторизоваться',
  listener = defaultListener
) => {
  const errorWindow = `
    <div class="error-wrapper">
      <div class="error-window">
        <span class="error-message">
          ${errorText}
        </span>
        <button class="error-button">${buttonText}</button>
        </div>
    </div>
  `;

  document.querySelector('body').insertAdjacentHTML('afterbegin', errorWindow);

  addButtonListener(listener);
};

const addButtonListener = (listener) => {
  const button = document.querySelector('.error-button');

  button.addEventListener('click', listener);
};

const defaultListener = () => {
  location.replace(window.location.origin);
};
