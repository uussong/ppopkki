import { useRef } from 'react'
import PrintController from './components/printController/PrintController'
import ImageController from './components/imageController/ImageController'

function App() {
  const printRef = useRef(null)

  return (
    <>
      <PrintController printRef={printRef} />
      <ImageController printRef={printRef} />
    </>
  )
}

export default App
