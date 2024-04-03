import { MutableRefObject } from 'react'

interface ImageListProps {
  printRef: MutableRefObject<null>
  imgList: string[]
}

function ImageList({ printRef, imgList }: ImageListProps) {
  return (
    <section>
      <ul ref={printRef}>
        {imgList.map((img, idx) => (
          <li>
            <img key={idx} src={img} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ImageList
