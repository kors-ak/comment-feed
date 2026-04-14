import { renderRegistration } from './renderRegistration.js'

export function renderLogin() {
  document.querySelector('.app').innerHTML = `
    <div class="reg">
      <p>Чтобы добавить комментарий, войдите</p>
      <input
        type="text"
        class="input"
        id="login-login"
        placeholder="Введите логин"
      />
      <input
        type="password"
        class="input"
        id="login-password"
        placeholder="Введите пароль"
      />
      <button class="login-button">Войти</button>
      <p><span class="goto" id="goto-reg">Зарегистрироваться</span></p>
    </div>
  `

  document
    .getElementById('goto-reg')
    .addEventListener('click', renderRegistration)
}
