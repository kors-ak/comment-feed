import { loginUser, updateToken, updateUserName } from './api.js'
import { sanitizeHtml } from './utils.js'
import { renderRegistration } from './renderRegistration.js'
import { renderForm } from './renderPostingForm.js'

export function renderLogin() {
  document.querySelector('.app').innerHTML = `
    <div class="login">
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

  const submitBtn = document.querySelector('.login-button')

  submitBtn.addEventListener('click', () => {
    const login = sanitizeHtml(document.getElementById('login-login').value)
    const password = sanitizeHtml(
      document.getElementById('login-password').value,
    )

    loginUser(login, password)
      .then((response) => {
        if (response.status === 400) {
          throw new Error('Неверный логин или пароль')
        }
        return response.json()
      })
      .then((data) => {
        updateToken(data.user.token)
        return updateUserName(data.user.name)
      })
      .then(() => renderForm())
      .catch((error) => {
        alert(error.message)
      })
  })

  document
    .getElementById('goto-reg')
    .addEventListener('click', renderRegistration)
}
