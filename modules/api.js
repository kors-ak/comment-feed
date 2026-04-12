const server = 'https://wedev-api.sky.pro/api/v1/alina-korsak/comments'
let serverErrorCount = 0

export async function fetchComments() {
  return fetch(server).then((response) => response.json())
}

export function post(text, name) {
  return fetch(server, {
    method: 'POST',
    body: JSON.stringify({
      text,
      name,
      forceError: true,
    }),
  }).then((response) => {
    if (response.status !== 500) {
      serverErrorCount = 0
    }

    if (response.status === 201) {
      return fetchComments()
    } else {
      if (response.status === 400) {
        throw new Error('Имя и комментарий должны быть не короче 3 символов')
      }

      if (response.status === 500) {
        if (serverErrorCount >= 1) {
          serverErrorCount = 0
          throw new Error('Сервер сломался, попробуйте позже')
        } else {
          serverErrorCount++
          return post(text, name)
        }
      }

      throw new Error('Что-то пошло не так')
    }
  })
}
