export function renderError(error) {
  const btn = document.querySelector('.container-login-form-btn');
  btn.insertAdjacentHTML(
    'beforebegin',
    '<p class = "error-text">Данный пользователь не найден</p>',
  );
}
