import { renderComments } from './rendering.js'
import { hideLoader } from './loaders.js'

export const commentsArr = []

export async function fetchAndRenderComments() {
  return fetch('https://wedev-api.sky.pro/api/v1/alina-korsak/comments')
    .then((response) => response.json())
    .then((data) => {
      commentsArr.length = 0
      commentsArr.push(...data.comments)
      hideLoader()
      return renderComments()
    })
    .catch((error) => {
      alert(
        error.message === 'Failed to fetch'
          ? 'Кажется, у вас сломался интернет, попробуйте позже'
          : error.message,
      )
    })
}
