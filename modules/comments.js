export let commentsArr = []

export async function updateCommentsArr() {
  await fetch('https://wedev-api.sky.pro/api/v1/korsak/comments')
    .then((response) => response.json())
    .then((data) => (commentsArr = data.comments))
}
