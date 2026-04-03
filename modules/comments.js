export const commentsArr = []

export function updateComments(data) {
  commentsArr.length = 0
  commentsArr.push(...data.comments)
}
