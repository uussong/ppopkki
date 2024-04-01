import { useState } from 'react'
import ImageInput from './ImageInput'

function ImageController() {
  const [imgList, setImgList] = useState<string[]>([])

  return (
    <section>
      <ImageInput
        setImgList={(imgList) => {
          setImgList((prevData) => [...prevData, ...imgList])
        }}
      />
    </section>
  )
}

export default ImageController
