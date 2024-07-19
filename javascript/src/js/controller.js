import { A4 } from '../constants/paper.js'

document.addEventListener('DOMContentLoaded', () => {
  const widthPlaceholder = `10~${A4.WIDTH - A4.PADDING * 2} (mm)`
  const heightPlaceholder = `10~${A4.HEIGHT - A4.PADDING * 2} (mm)`

  document.getElementById('width').setAttribute('placeholder', widthPlaceholder)
  document
    .getElementById('height')
    .setAttribute('placeholder', heightPlaceholder)
})
