import { renderLogin } from './renderLogin.js'

export function renderRegistration() {
  document.querySelector('.app').innerHTML = `
    <div class="reg">
      <p>Чтобы добавить комментарий, зарегистрируйтесь</p>
      <input
        type="text"
        class="input"
        id="reg-name"
        placeholder="Введите ваше имя"
      />
      <input
        type="text"
        class="input"
        id="reg-login"
        placeholder="Придумайте логин"
      />
      <input
        type="password"
        class="input"
        id="reg-password"
        placeholder="Придумайте пароль"
      />
      <button class="reg-button">Зарегистрироваться</button>
      <p>Уже есть аккаунт? <span class="goto" id="goto-login">Авторизуйтесь</span></p>
    </div>
  `

  document.getElementById('goto-login').addEventListener('click', renderLogin)
}
