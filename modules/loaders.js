const formEl = document.querySelector('.add-form')
const formLoader = document.querySelector('.formLoader')
const loader = document.querySelector('.loader')

export function hideLoader() {
  loader.classList.remove('loader--active')
}

export function disableForm(state) {
  if (state) {
    formEl.classList.add('hidden')
    formLoader.classList.remove('hidden')
  } else {
    formLoader.classList.add('hidden')
    formEl.classList.remove('hidden')
  }
}
