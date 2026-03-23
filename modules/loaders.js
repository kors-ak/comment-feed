export function hideLoader() {
  const loader = document.querySelector('.loader')
  loader.classList.remove('loader--active')
}

const formEl = document.querySelector('.add-form')
const formLoader = document.querySelector('.formLoader')

export function disableForm(state) {
  if (state) {
    formEl.classList.add('hidden')
    formLoader.classList.remove('hidden')
  } else {
    formLoader.classList.add('hidden')
    formEl.classList.remove('hidden')
  }
}
