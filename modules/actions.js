import { commentsArr } from './comments.js'
import { renderComments } from './rendering.js'
import { textField } from './posting.js'

export function initLikeAction() {
  const likeButtons = document.querySelectorAll('.like-button')
  for (const btn of likeButtons) {
    const comment = commentsArr[btn.dataset.id]

    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      if (comment.isLiked) {
        comment.isLiked = false
        comment.likes--
      } else {
        comment.isLiked = true
        comment.likes++
      }

      renderComments()
    })
  }
}

export function initAnsverAction() {
  const comments = document.querySelectorAll('.comment')

  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i]
    const commentEl = commentsArr[i]

    comment.addEventListener('click', () => {
      textField.value = `⮩ “ ${commentEl.text.replace(/⮩\s*“\s*[^”]*\s*”/g, '').trim()} ” \n\n${commentEl.name}, `
    })
  }
}
