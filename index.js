import { fetchComments } from './modules/api.js'
import { updateComments } from './modules/comments.js'
import { hideLoader } from './modules/loaders.js'
import { renderComments } from './modules/rendering.js'
import { renderLogin } from './modules/renderLogin.js'

await fetchComments().then((data) => {
  updateComments(data)
  hideLoader()
  return renderComments()
})

renderLogin()
