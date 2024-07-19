import { A4 } from '../constants/paper.js'

document.addEventListener('DOMContentLoaded', () => {
  const minValue = 10
  const maxWidth = A4.WIDTH - A4.PADDING * 2
  const maxHeight = A4.HEIGHT - A4.PADDING * 2

  document
    .getElementById('width')
    .setAttribute('placeholder', `10~${maxWidth} (mm)`)
  document.getElementById('width').setAttribute('min', minValue)
  document.getElementById('width').setAttribute('max', maxWidth)

  document
    .getElementById('height')
    .setAttribute('placeholder', `10~${maxHeight} (mm)`)
  document.getElementById('height').setAttribute('min', minValue)
  document.getElementById('height').setAttribute('max', maxHeight)

  const form = document.getElementById('form')
  form.addEventListener('submit', (event) => {
    event.preventDefault()
  })
})
