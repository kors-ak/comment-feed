const server = 'https://wedev-api.sky.pro/api/v2/alina-korsak/comments'
const serverUsers = ' https://wedev-api.sky.pro/api/user'

let token = ''

export const updateToken = (newToken) => (token = newToken)

export function registerUser(name, login, password) {
  return fetch(serverUsers, {
    method: 'POST',
    body: JSON.stringify({
      login,
      name,
      password,
    }),
  }).then((response) => response.json())
}

export function loginUser(login, password) {
  return fetch(`${serverUsers}/login`, {
    method: 'POST',
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => response.json())
}

export async function fetchComments() {
  return fetch(server).then((response) => response.json())
}

export function postComment(text, name) {
  return fetch(server, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      name,
      forceError: true,
    }),
  })
}
