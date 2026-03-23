import { hideLoader } from './modules/loaders.js'
import { postNewComment } from './modules/posting.js'
import { fetchAndRenderComments } from './modules/comments.js'

await fetchAndRenderComments()
hideLoader()
postNewComment()
