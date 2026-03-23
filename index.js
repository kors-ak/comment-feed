import { renderComments } from './modules/rendering.js'
import { postNewComment } from './modules/posting.js'
import { getApiComments } from './modules/comments.js'

await getApiComments()
renderComments()
postNewComment()
