import { fetchAndRenderComments } from './comments.js'
import { disableForm } from './loaders.js'
import { nameField, textField } from './posting.js'

export function post(obj) {
  fetch('https://wedev-api.sky.pro/api/v1/alina-korsak/comments', {
    method: 'POST',
    body: JSON.stringify(obj),
    forceError: false,
  })
    .then(async (response) => {
      if (response.status === 201) {
        return fetchAndRenderComments()
      } else {
        if (response.status === 400) {
          if (obj.name.trim().length < 3) {
            nameField.classList.add('error')
          }
          if (obj.text.trim().length < 3) {
            textField.classList.add('error')
          }

          const errorData = await response.json()
          console.log(errorData.error)

          throw new Error('Имя и комментарий должны быть не короче 3 символов')
        }
        if (response.status === 500) {
          throw new Error('Сервер сломался, попробуй позже')
        }
      }
    })
    .then(() => {
      nameField.value = ''
      textField.value = ''
    })
    .catch((error) => {
      alert(error.message)
    })
    .finally(() => {
      disableForm(false)
    })
}
