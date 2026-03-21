import { sanitizeHtml, formatDate } from './utils.js'
import { commentsArr } from './comments.js'
import { renderComments } from './rendering.js'

const buttonEl = document.querySelector('.add-form-button')
const nameField = document.querySelector('.add-form-name')
export const textField = document.querySelector('.add-form-text')

export function postNewComment() {
  buttonEl.addEventListener('click', () => {
    const currentDate = new Date()
    const dateStr = `${formatDate(currentDate)}`
    let name = sanitizeHtml(nameField.value)
    let text = sanitizeHtml(textField.value)
      .replace(/(\n){3,}/g, '\n\n')
      .trim()

    let hasError = false

    if (name.trim().length === 0) {
      hasError = true
      nameField.classList.add('error')
      nameField.value = ''
    }
    if (text.trim().length === 0) {
      hasError = true
      textField.classList.add('error')
      textField.value = ''
    }

    if (!hasError) {
      const newComment = {
        name: name,
        date: dateStr,
        text: text,
        isLiked: false,
        likes: 0,
      }
      commentsArr.push(newComment)
      nameField.value = ''
      textField.value = ''
      renderComments()
    }
  })

  nameField.addEventListener('input', () => {
    nameField.classList.remove('error')
  })
  textField.addEventListener('input', () => {
    textField.classList.remove('error')
  })
}
