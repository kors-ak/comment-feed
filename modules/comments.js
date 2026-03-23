import { renderComments } from './rendering.js'
import { hideLoader } from './loader.js'

export let commentsArr = []

export async function fetchAndRenderComments() {
  return fetch('https://wedev-api.sky.pro/api/v1/korsak/comments')
    .then((response) => response.json())
    .then((data) => {
      commentsArr = data.comments
      hideLoader()
      return renderComments()
    })
}
