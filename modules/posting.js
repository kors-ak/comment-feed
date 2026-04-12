import { sanitizeHtml } from './utils.js'
import { disableForm } from './loaders.js'
import { post } from './api.js'
import { updateComments } from './comments.js'
import { renderComments } from './rendering.js'

export const buttonEl = document.querySelector('.add-form-button')
export const nameField = document.querySelector('.add-form-name')
export const textField = document.querySelector('.add-form-text')

export function postNewComment() {
  buttonEl.addEventListener('click', async () => {
    let name = sanitizeHtml(nameField.value)
    let text = sanitizeHtml(textField.value)
      .replace(/(\n){3,}/g, '\n\n')
      .trim()

    disableForm(true)

    post(text, name)
      .then((data) => {
        nameField.value = ''
        textField.value = ''
        updateComments(data)
        return renderComments()
      })
      .catch((error) => {
        if (name.trim().length < 3) {
          nameField.classList.add('error')
        }
        if (text.trim().length < 3) {
          textField.classList.add('error')
        }
        alert(
          error.message === 'Failed to fetch'
            ? 'Кажется, у вас пропал интернет, попробуйте позже'
            : error.message,
        )
      })
      .finally(() => {
        disableForm(false)
      })
  })

  nameField.addEventListener('input', () => {
    nameField.classList.remove('error')
  })
  textField.addEventListener('input', () => {
    textField.classList.remove('error')
  })
}
