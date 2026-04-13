const server = 'https://wedev-api.sky.pro/api/v1/alina-korsak/comments'

export async function fetchComments() {
  return fetch(server).then((response) => response.json())
}

export function postComment(text, name) {
  return fetch(server, {
    method: 'POST',
    body: JSON.stringify({
      text,
      name,
      forceError: true,
    }),
  })
}
