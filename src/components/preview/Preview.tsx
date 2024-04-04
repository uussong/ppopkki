import { MutableRefObject } from 'react'
import { css } from '@emotion/react'
import { A4, SCALE_FACTOR } from '../../constants/paper'

interface PreviewProps {
  printRef: MutableRefObject<null>
  imgList: string[]
  width: number
  height: number
}

function Preview({ printRef, imgList, width, height }: PreviewProps) {
  return (
    <section css={sectionStyles}>
      <ul ref={printRef} css={listStyles}>
        {imgList.map((img, idx) => (
          <li key={idx} css={listItemStyles(width, height)}>
            <img src={img} css={imageStyles} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Preview

const sectionStyles = css`
  grid-area: preview;
  padding: 12px;
  background-color: #eee;
`

const listStyles = css`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 5px;
  width: ${A4.WIDTH * SCALE_FACTOR.DESKTOP}px;
  height: ${A4.HEIGHT * SCALE_FACTOR.DESKTOP}px;
  padding: 20px;
  background-color: #fff;

  @media print {
    width: ${A4.WIDTH}mm;
    height: ${A4.HEIGHT}mm;
  }
`

const listItemStyles = (width: number, height: number) => css`
  width: ${width * SCALE_FACTOR.DESKTOP}px;
  height: ${height * SCALE_FACTOR.DESKTOP}px;
  box-shadow: inset 0 0 0 1px #eee;

  @media print {
    width: ${width}mm;
    height: ${height}mm;
    box-shadow: none;
  }
`

const imageStyles = css`
  width: 100%;
  height: 100%;
  object-fit: contain;
`
