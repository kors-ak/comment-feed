import { postNewComment } from './posting.js'
import { userName } from './api.js'

export function renderForm() {
  document.querySelector('.app').innerHTML = `
    <div class="add-form">
      <input
        type="text"
        class="add-form-name"
        value="${userName}"
        readonly
      />
      <textarea
        type="textarea"
        class="add-form-text"
        placeholder="Введите ваш коментарий"
        rows="4"
      ></textarea>
      <div class="add-form-row">
        <button class="add-form-button">Написать</button>
      </div>
    </div>
    <p class="unauthorized-text">Выйти из аккаунта</p>
  `

  postNewComment()

  document.querySelector('.unauthorized-text').addEventListener('click', () => {
    localStorage.clear()
    location.reload()
  })
}
