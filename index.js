import { renderComments } from './modules/rendering.js'
import { postNewComment } from './modules/posting.js'
import { updateCommentsArr } from './modules/comments.js'

await updateCommentsArr()
renderComments()
postNewComment()
