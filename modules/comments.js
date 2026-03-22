export let commentsArr = []

export const updateCommentsArr = (apiComments) => {
  commentsArr = apiComments
}

export async function getApiComments() {
  await fetch('https://wedev-api.sky.pro/api/v1/korsak/comments')
    .then((response) => response.json())
    .then((data) => updateCommentsArr(data.comments))
}
