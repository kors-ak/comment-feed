import { fetchComments } from './modules/api.js'
import { updateComments } from './modules/comments.js'
import { renderComments } from './modules/rendering.js'
import { renderLogin } from './modules/renderLogin.js'

await fetchComments().then((data) => {
  updateComments(data)
  return renderComments()
})

document
  .querySelector('.unauthorized-text')
  .addEventListener('click', renderLogin)
