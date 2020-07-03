import './login.css';
import { createUser, loginUser } from '../../services/authService';
import { validate, showValidate, hideValidate } from './validate';
import { renderLogIn, renderSignUp } from './sign-up';
import { renderError } from './errors';
import { putDefaultSettings } from '../../services/settingsService';

const body = document.querySelector('body');
body.innerHTML = `
<div class="limiter"><div class="container-login"><div class="wrap-login">
<form class="login-form validate-form"><span class="login-form-title">
Добро пожаловать!</span><span class="login-form-title text-center">
<img class ="logo" src="/assets/images/logo.png" alt="logo">
</span><div class="wrap-input validate-input" data-validate = "Корректный адрес: a@b.c">
<input class="input" type="text" name="email">
<span class="focus-input" data-placeholder="Электронная почта"></span>
</div><div class="wrap-input validate-input" data-validate="Ошибка в пароле">
<span class="btn-show-pass"><span class="material-icons">visibility</span>
</span><input class="input" type="password" name="pass" data-toggle="tooltip" data-placement="bottom" title="Пароль должен содержать не менее 8 символов,\n как минимум одну прописную букву, одну заглавную букву, \n одну цифру и один спецсимвол из +-_@$!%*?&#.,;:[]{}">
<span class="focus-input" data-placeholder="Пароль"></span>
</div><div class="container-login-form-btn">
<div class="wrap-login-form-btn"><div class="login-form-bgbtn"></div>
<button class="login-form-btn">Войти</button>
</div></div><div class="text-center"><span class="txt1">У вас нет аккаунта?</span>
<a class="txt2 signUp" href="#">Зарегистрироваться</a></div></form></div></div></div>
`;

document.querySelectorAll('.input').forEach((elem) => {
  elem.addEventListener('blur', () => {
    if (elem.value.trim() !== '') {
      elem.classList.add('has-val');
    } else {
      elem.classList.remove('has-val');
    }
  });
});

const input = document.querySelectorAll('.validate-input .input');

document.querySelector('.validate-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const errorText = document.querySelector('.error-text');
  if (errorText) {
    errorText.remove();
  }
  let check = true;

  for (let i = 0; i < input.length; i += 1) {
    if (validate(input[i]) === false) {
      showValidate(input[i]);
      check = false;
    }
  }

  if (document.querySelector('.sign-up')) {
    if (check) {
      createUser({
        email: `${input[0].value}`,
        password: `${input[1].value}`,
      }).then(() => loginUser({
        email: `${input[0].value}`,
        password: `${input[1].value}`,
      })).then((res) => putDefaultSettings(res.userId)).catch((err) => renderError(err));
      renderLogIn();
    }
  } else if (check) {
    loginUser({
      email: `${input[0].value}`,
      password: `${input[1].value}`,
    }).catch((err) => renderError(err));
  }
});

document.querySelectorAll('.validate-form .input').forEach((elem) => {
  elem.addEventListener('focus', (event) => {
    hideValidate(event);
  });
});

let showPass = 0;
document.querySelector('.btn-show-pass').addEventListener('click', () => {
  if (showPass === 0) {
    document.querySelector('[name = pass]').setAttribute('type', 'text');
    document.querySelector('.material-icons').textContent = 'visibility_off';
    showPass = 1;
  } else {
    document.querySelector('[name = pass]').setAttribute('type', 'password');
    document.querySelector('.material-icons').textContent = 'visibility';
    showPass = 0;
  }
});

const txt2 = document.querySelector('.txt2');
txt2.addEventListener('click', (event) => {
  event.preventDefault();
  const errorText = document.querySelector('.error-text');
  if (errorText) {
    errorText.remove();
  }
  const signUp = document.querySelector('.signUp');
  if (signUp) {
    renderSignUp();
  } else {
    renderLogIn();
  }
});
