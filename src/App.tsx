import { useRef, useState } from 'react'
import Controller from './components/controller/Controller'
import ImageList from './components/imageList/ImageList'

function App() {
  const printRef = useRef(null)
  const [imgList, setImgList] = useState<string[]>([])
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  return (
    <>
      <Controller
        printRef={printRef}
        setWidth={(width: number) => setWidth(width)}
        setHeight={(height: number) => setHeight(height)}
        setImgList={(imgList) => {
          setImgList((prevData) => [...prevData, ...imgList])
        }}
      />
      <ImageList
        printRef={printRef}
        imgList={imgList}
        width={width}
        height={height}
      />
    </>
  )
}

export default App
