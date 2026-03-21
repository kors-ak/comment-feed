export const commentsArr = await fetch(
  'https://wedev-api.sky.pro/api/v1/alina-korsak/comments',
)
  .then((response) => response.json())
  .then((data) => data.comments)
