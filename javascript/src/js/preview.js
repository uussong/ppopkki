document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form')
  const widthInput = document.getElementById('width')
  const heightInput = document.getElementById('height')
  const imageContainer = document.getElementById('image-container')
  const fileInput = document.getElementById('file-input')
  const submitButton = document.getElementById('submit-button')
  const printButton = document.getElementById('print-button')

  let imgWidth
  let imgHeight

  fileInput.disabled = true

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const width = parseInt(widthInput.value, 10)
    const height = parseInt(heightInput.value, 10)

    if (isNaN(width) || isNaN(height) || width < 10 || height < 10) {
      return
    }

    imgWidth = width
    imgHeight = height

    fileInput.disabled = false
    printButton.disabled = false
  })

  fileInput.addEventListener('change', (event) => {
    const files = event.target.files

    imageContainer.innerHTML = ''

    for (const file of files) {
      const url = URL.createObjectURL(file)
      const img = document.createElement('img')
      img.src = url
      img.style.width = `${imgWidth}px`
      img.style.height = `${imgHeight}px`
      img.style.objectFit = 'cover'

      imageContainer.appendChild(img)
    }
  })

  submitButton.addEventListener('click', () => {
    const width = parseInt(widthInput.value, 10)
    const height = parseInt(heightInput.value, 10)

    if (!isNaN(width) && !isNaN(height) && width >= 10 && height >= 10) {
      imgWidth = width
      imgHeight = height

      const images = imageContainer.querySelectorAll('img')
      images.forEach((img) => {
        img.style.width = `${imgWidth}px`
        img.style.height = `${imgHeight}px`
      })
    }
  })
})
