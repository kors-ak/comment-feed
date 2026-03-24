import { commentsArr } from './comments.js'
import { renderComments } from './rendering.js'
import { textField } from './posting.js'
import { delay } from './utils.js'

export function initLikeAction() {
  const likeButtons = document.querySelectorAll('.like-button')
  for (const btn of likeButtons) {
    const btnId = parseInt(btn.dataset.id, 10)
    const comment = commentsArr.find((c) => c.id === btnId)

    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      if (btn.disabled) return
      btn.disabled = true
      btn.classList.add('-loading-like')

      delay(1200)
        .then(() => {
          const wasLiked = comment.isLiked
          if (wasLiked) {
            comment.isLiked = false
            comment.likes--
          } else {
            comment.isLiked = true
            comment.likes++
          }

          renderComments()

          const currentBtn = document.querySelector(
            `.like-button[data-id="${btnId}"]`,
          )
          if (!wasLiked && comment.isLiked) {
            currentBtn.classList.add('-active-like--animation')

            setTimeout(() => {
              currentBtn.classList.remove('-active-like--animation')
            }, 500)
          }
        })
        .catch((error) => {
          console.error(error)
          btn.disabled = false
          btn.classList.remove('-loading-like')
        })
    })
  }
}

export function initAnsverAction() {
  const comments = document.querySelectorAll('.comment')

  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i]
    const commentEl = commentsArr[i]

    comment.addEventListener('click', () => {
      textField.value = `⮩ “ ${commentEl.text.replace(/⮩\s*“\s*[^”]*\s*”/g, '').trim()} ” \n\n${commentEl.author.name}, `
    })
  }
}
