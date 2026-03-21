import { commentsArr } from './comments.js'
import { initLikeAction, initAnsverAction } from './actions.js'
import { formatDate } from './utils.js'

const commentFeed = document.querySelector('.comments')

export function renderComments() {
  if (commentsArr.length === 0) {
    commentFeed.innerHTML = '<p>Комментариев пока нет</p>'
    return
  }

  const allCommentsHtml = commentsArr
    .map(
      (el) => `
  <li class="comment">
    <div class="comment-header">
      <div>${el.author.name}</div>
      <div>${formatDate(el.date)} </div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${el.text}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${el.likes}</span>
        <button data-index="${el.id}" class="like-button${el.isLiked ? ' -active-like' : ''}"></button>
      </div>
    </div>
  </li>`,
    )
    .join('')

  commentFeed.innerHTML = allCommentsHtml

  initLikeAction()
  initAnsverAction()
}
