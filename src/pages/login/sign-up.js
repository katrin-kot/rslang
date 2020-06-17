export function renderSignUp() {
  const txt1 = document.querySelector('div.text-center > span');
  const txt2 = document.querySelector('.txt2');
  document
    .querySelectorAll('.wrap-input')[1]
    .insertAdjacentHTML(
      'beforeend', '<p class = "txt1 password-valid">Пароль должен быть минимум 8 символов</p>',
    );
  document.querySelector('.login-form-btn').textContent = 'Зарегистрироваться';
  document.querySelector('.login-form-btn').classList.add('sign-up');
  txt1.textContent = 'У вас есть аккаунт?';
  txt2.classList.remove('signUp');
  txt2.classList.add('logIn');
  txt2.textContent = 'Войти';
}

export function renderLogIn() {
  document.querySelector('.password-valid').remove();
  document.querySelector('.login-form-btn').textContent = 'Войти';
  document.querySelector('.login-form-btn').classList.remove('sign-up');
  const txt1 = document.querySelector('div.text-center > span');
  const txt2 = document.querySelector('.txt2');
  txt1.textContent = 'У вас нет аккаунта?';
  txt2.classList.add('signUp');
  txt2.textContent = 'Зарегистрироваться';
}
