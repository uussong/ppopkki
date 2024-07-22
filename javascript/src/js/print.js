import { A4 } from '../constants/paper.js'

document.addEventListener('DOMContentLoaded', () => {
  const printButton = document.getElementById('print-button')
  const imageContainer = document.getElementById('image-container')

  printButton.addEventListener('click', () => {
    const printWindow = window.open('', '', 'width=800,height=600')

    const style = `
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
        #image-container {
          width: ${A4.WIDTH}mm;
          height: ${A4.HEIGHT}mm;
        }
        img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
      }
    `

    printWindow.document.open()
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Preview</title>
          <style>
            ${style}
          </style>
        </head>
        <body>
          ${imageContainer.innerHTML}
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
  })
})
