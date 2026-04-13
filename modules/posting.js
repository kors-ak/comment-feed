import { sanitizeHtml } from './utils.js'
import { disableForm } from './loaders.js'
import { fetchComments, postComment } from './api.js'
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

    const maxRetries = 2
    let retryCount = 0

    makePostRequest()

    async function makePostRequest() {
      try {
        const response = await postComment(text, name)

        switch (response.status) {
          case 201: {
            nameField.value = ''
            textField.value = ''

            const data = await fetchComments()
            updateComments(data)
            renderComments()
            break
          }
          case 400:
            throw new Error(
              'Имя и комментарий должны быть не короче 3 символов',
            )
          case 500:
            retryCount++
            if (retryCount < maxRetries) {
              console.warn(
                `Попытка ${retryCount} неудачна, повторяем запрос...`,
              )
              return makePostRequest()
            } else {
              throw new Error('Сервер недоступен, попробуйте позже')
            }
          default:
            throw new Error('Что-то пошло не так')
        }
      } catch (error) {
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
      } finally {
        disableForm(false)
      }
    }
  })

  nameField.addEventListener('input', () => {
    nameField.classList.remove('error')
  })
  textField.addEventListener('input', () => {
    textField.classList.remove('error')
  })
}
