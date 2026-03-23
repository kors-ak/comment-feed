import { sanitizeHtml } from './utils.js'
import { renderComments } from './rendering.js'
import { updateCommentsArr } from './comments.js'

const buttonEl = document.querySelector('.add-form-button')
const nameField = document.querySelector('.add-form-name')

export const textField = document.querySelector('.add-form-text')

export function postNewComment() {
  buttonEl.addEventListener('click', async () => {
    let name = sanitizeHtml(nameField.value)
    let text = sanitizeHtml(textField.value)
      .replace(/(\n){3,}/g, '\n\n')
      .trim()

    let hasError = false

    if (name.trim().length < 3) {
      hasError = true
      nameField.classList.add('error')
      nameField.value = ''
    }
    if (text.trim().length < 3) {
      hasError = true
      textField.classList.add('error')
      textField.value = ''
    }

    if (!hasError) {
      const newComment = {
        text: text,
        name: name,
      }

      fetch('https://wedev-api.sky.pro/api/v1/korsak/comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
      })
        .then((response) => {
          console.log('Статус ответа:', response.status)
          return updateCommentsArr()
        })
        .then(() => {
          renderComments()
          nameField.value = ''
          textField.value = ''
        })
        .catch((error) => {
          console.error('Ошибка:', error)
        })
    }
  })

  nameField.addEventListener('input', () => {
    nameField.classList.remove('error')
  })
  textField.addEventListener('input', () => {
    textField.classList.remove('error')
  })
}
