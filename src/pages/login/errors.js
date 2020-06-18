export function renderError(error) {
  const errorText = document.querySelector('.error-text');
  if (errorText) {
    errorText.remove();
  }
  const btn = document.querySelector('.container-login-form-btn');
  if (error.message === 'Unexpected token C in JSON at position 0') {
    btn.insertAdjacentHTML(
      'beforebegin',
      '<p class = "error-text">Данный пользователь не найден</p>',
    );
  } else if (error.message === 'Unexpected token u in JSON at position 0') {
    btn.insertAdjacentHTML(
      'beforebegin',
      '<p class = "error-text">Данный пользователь уже существует</p>',
    );
  } else {
    btn.insertAdjacentHTML(
      'beforebegin',
      `<p class = "error-text">${error.message}</p>`,
    );
  }
}
