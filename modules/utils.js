export const sanitizeHtml = (string) => {
  String(string)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

export const formatDate = (data) => {
  const date = new Date(data)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear()).slice(-2)

  const time = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  const result = `${day}.${month}.${year} ${time}`

  return result
}
