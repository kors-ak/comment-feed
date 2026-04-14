import { commentsArr } from './comments.js'
import { initLikeAction, initAnsverAction } from './actions.js'
import { formatDate } from './utils.js'
import { hideLoader } from './loaders.js'

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
        <button data-id="${el.id}" class="like-button${el.isLiked ? ' -active-like' : ''}"></button>
      </div>
    </div>
  </li>`,
    )
    .join('')

  document.querySelector('.container').innerHTML = `
    <ul class="comments">${allCommentsHtml}</ul>
    <span class="loader loader--active"></span>
    <div class="app"><p class="unauthorized-text">Чтобы добавить комментарий, авторизуйтесь</p></div>
    <span class="formLoader hidden"></span>
  `

  hideLoader()

  initLikeAction()
  initAnsverAction()
}
