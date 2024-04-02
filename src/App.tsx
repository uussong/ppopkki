import { useRef, useState } from 'react'
import PrintController from './components/printController/PrintController'
import ImageController from './components/imageController/ImageController'

function App() {
  const printRef = useRef(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  return (
    <>
      <PrintController
        printRef={printRef}
        setWidth={(width: number) => setWidth(width)}
        setHeight={(height: number) => setHeight(height)}
      />
      <ImageController printRef={printRef} />
    </>
  )
}

export default App
