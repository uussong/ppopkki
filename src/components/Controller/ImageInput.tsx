import { RefObject, useRef } from 'react'

interface ImageInputProps {
  setImgList: (imgList: string[]) => void
}

function ImageInput({ setImgList }: ImageInputProps) {
  const imgRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)

  const getImg = () => {
    const fileList = Array.from(imgRef.current?.files || [])

    if (fileList && fileList.length > 0) {
      fileList.forEach((file) => {
        const reader = new FileReader()
        reader.onload = () => {
          const imgUrl = reader.result as string
          setImgList([imgUrl])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  return (
    <>
      <label htmlFor="image">사진 선택</label>
      <input
        type="file"
        id="image"
        accept="image/*"
        ref={imgRef}
        onChange={getImg}
        multiple
      />
    </>
  )
}

export default ImageInput
