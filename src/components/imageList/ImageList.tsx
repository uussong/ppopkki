import { MutableRefObject } from 'react'
import { css } from '@emotion/react'

interface ImageListProps {
  printRef: MutableRefObject<null>
  imgList: string[]
  width: number
  height: number
}

function ImageList({ printRef, imgList, width, height }: ImageListProps) {
  return (
    <section>
      <ul ref={printRef}>
        {imgList.map((img, idx) => (
          <li css={listItemStyles(width, height)}>
            <img key={idx} src={img} css={imageStyles} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ImageList

const listItemStyles = (width: number, height: number) => css`
  width: ${width}px;
  height: ${height}px;
  border: 1px solid #999;
`

const imageStyles = css`
  width: 100%;
  height: 100%;
  object-fit: contain;
`
