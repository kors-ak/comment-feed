import { registerUser, updateToken, updateUserName } from './api.js'
import { sanitizeHtml } from './utils.js'
import { renderLogin } from './renderLogin.js'
import { renderForm } from './renderPostingForm.js'
import { renderComments } from './rendering.js'

export function renderRegistration() {
  document.querySelector('.container').innerHTML = `
    <div class="reg">
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

  const submitBtn = document.querySelector('.reg-button')

  submitBtn.addEventListener('click', () => {
    const name = sanitizeHtml(document.getElementById('reg-name').value)
    const login = sanitizeHtml(document.getElementById('reg-login').value)
    const password = sanitizeHtml(document.getElementById('reg-password').value)

    if (name.trim().length < 3) {
      alert('Имя должно быть не короче 3 символов')
      return
    }

    registerUser(name, login, password)
      .then((response) => {
        if (response.status === 400) {
          throw new Error('Пользователь с таким логином уже существует')
        }
        return response.json()
      })
      .then((data) => {
        updateToken(data.user.token)
        updateUserName(data.user.name)

        return localStorage.setItem('UserName', `${data.user.name}`)
      })
      .then(() => {
        renderComments()
        renderForm()
      })
      .catch((error) => {
        alert(error.message)
      })
  })

  document.getElementById('goto-login').addEventListener('click', renderLogin)
}
