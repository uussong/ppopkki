import { useState } from 'react'
import ImageInput from './ImageInput'
import ImageList from './ImageList'

function ImageController() {
  const [imgList, setImgList] = useState<string[]>([])

  return (
    <section>
      {imgList && <ImageList imgList={imgList} />}
      <ImageInput
        setImgList={(imgList) => {
          setImgList((prevData) => [...prevData, ...imgList])
        }}
      />
    </section>
  )
}

export default ImageController
