import { MutableRefObject, useState } from 'react'
import ImageInput from './ImageInput'
import ImageList from './ImageList'

interface ImageControllerProps {
  printRef: MutableRefObject<null>
}

function ImageController({ printRef }: ImageControllerProps) {
  const [imgList, setImgList] = useState<string[]>([])

  return (
    <section>
      <ImageList printRef={printRef} imgList={imgList} />
      <ImageInput
        setImgList={(imgList) => {
          setImgList((prevData) => [...prevData, ...imgList])
        }}
      />
    </section>
  )
}

export default ImageController
