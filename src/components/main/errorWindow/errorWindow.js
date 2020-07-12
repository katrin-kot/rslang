import './errorWindow.css';

const addButtonListener = (listener) => {
  const button = document.querySelector('.error-button');

  button.addEventListener('click', listener);
};

const defaultListener = () => {
  window.location.replace('/login.html');
};

export const errorWindow = (
  errorText = 'Ошибка авторизации. Необходимо войти в учётную запись.',
  buttonText = 'Авторизоваться',
  listener = defaultListener,
) => {
  const window = `
    <div class="error-wrapper">
      <div class="error-window">
        <span class="error-message">
          ${errorText}
        </span>
        <button class="error-button">${buttonText}</button>
        </div>
    </div>
  `;

  document.querySelector('body').insertAdjacentHTML('afterbegin', window);

  addButtonListener(listener);
};
