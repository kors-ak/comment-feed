import { fetchComments } from './modules/api.js'
import { updateComments } from './modules/comments.js'
import { renderComments } from './modules/rendering.js'

await fetchComments().then((data) => {
  updateComments(data)
  renderComments()
})
