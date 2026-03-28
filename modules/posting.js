import { sanitizeHtml } from './utils.js'
import { disableForm } from './loaders.js'
import { post } from './api-post.js'

export const buttonEl = document.querySelector('.add-form-button')
export const nameField = document.querySelector('.add-form-name')

export const textField = document.querySelector('.add-form-text')

export function postNewComment() {
  buttonEl.addEventListener('click', () => {
    let name = sanitizeHtml(nameField.value)
    let text = sanitizeHtml(textField.value)
      .replace(/(\n){3,}/g, '\n\n')
      .trim()

    const newComment = {
      text: text,
      name: name,
    }

    post(newComment)
    disableForm(true)
  })

  nameField.addEventListener('input', () => {
    nameField.classList.remove('error')
  })
  textField.addEventListener('input', () => {
    textField.classList.remove('error')
  })
}
