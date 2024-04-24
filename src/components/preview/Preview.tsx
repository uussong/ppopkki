import { MutableRefObject, useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { A4, SCALE_FACTOR } from '../../constants/paper'

interface PreviewProps {
  printRef: MutableRefObject<null>
  imgList: string[]
  width: number
  height: number
}

function Preview({ printRef, imgList, width, height }: PreviewProps) {
  const [activePage, setActivePage] = useState(0)
  const [maxImagesPerPage, setMaxImagesPerPage] = useState(0)

  useEffect(() => {
    if (width && height) {
      const availableWidth = A4.WIDTH - A4.PADDING * 2
      const availableHeight = A4.HEIGHT - A4.PADDING * 2
      const columnCountRemainder = availableWidth % (width + 5)
      const rowCountRemainder = availableHeight % (height + 5)

      const columnCount =
        columnCountRemainder >= width
          ? Math.floor(availableWidth / (width + 5)) +
            Math.floor(columnCountRemainder / width)
          : Math.floor(availableWidth / (width + 5))
      const rowCount =
        rowCountRemainder >= height
          ? Math.floor(availableHeight / (height + 5)) +
            Math.floor(rowCountRemainder / height)
          : Math.floor(availableHeight / (height + 5))

      const maxImagesPerPage = columnCount * rowCount
      setMaxImagesPerPage(maxImagesPerPage)
    }
  }, [width, height])

  const array = Array.from({ length: maxImagesPerPage })
  const imagePages = []
  for (let i = 0; i < imgList.length; i += maxImagesPerPage) {
    imagePages.push(imgList.slice(i, i + maxImagesPerPage))
  }

  const handlePageButtonClick = (idx: number) => {
    setActivePage(idx)
  }

  return (
    <section css={sectionStyles}>
      <div ref={printRef} css={slideWrapperStyles}>
        {imgList.length > 0 ? (
          <>
            {imagePages.map((imagePage, idx) => (
              <div key={idx} css={slideStyles(activePage)}>
                <ul css={listStyles}>
                  {imagePage.map((img, idx) => (
                    <li key={idx} css={listItemStyles(width, height)}>
                      <img src={img} css={imageStyles} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        ) : (
          <>
            <ul css={listStyles}>
              {array.map((_, index) => (
                <li key={index} css={listItemStyles(width, height)}></li>
              ))}
            </ul>
          </>
        )}
      </div>
      {imagePages.length > 1 && (
        <ul css={buttonListStyles}>
          {imagePages.map((_, idx: number) => (
            <li key={idx}>
              <button
                onClick={() => handlePageButtonClick(idx)}
                css={buttonStyles}
              >
                {idx + 1}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Preview

const sectionStyles = css`
  grid-area: preview;
  max-width: ${A4.WIDTH * SCALE_FACTOR.DESKTOP}px;
  min-height: ${A4.HEIGHT * SCALE_FACTOR.DESKTOP}px;

  @media screen and (max-width: 768px) {
    max-width: ${A4.WIDTH * SCALE_FACTOR.MOBILE}px;
    min-height: ${A4.HEIGHT * SCALE_FACTOR.MOBILE}px;
  }
`

const slideWrapperStyles = css`
  display: flex;
  overflow: hidden;

  @media print {
    display: block;
    width: ${A4.WIDTH}mm;
    height: ${A4.HEIGHT}mm;
    overflow: visible;
  }
`

const slideStyles = (idx: number) => css`
  width: 100%;
  height: 100%;
  transform: translateX(-${idx * 100}%);

  @media print {
    transform: none;
  }
`

const listStyles = css`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: ${5 * SCALE_FACTOR.DESKTOP}px;
  width: ${A4.WIDTH * SCALE_FACTOR.DESKTOP}px;
  height: ${A4.HEIGHT * SCALE_FACTOR.DESKTOP}px;
  padding: ${A4.PADDING * SCALE_FACTOR.DESKTOP}px;
  background-color: #fff;
  box-shadow: inset 0 0 0 2px #eee;

  @media screen and (max-width: 768px) {
    gap: ${5 * SCALE_FACTOR.MOBILE}px;
    width: ${A4.WIDTH * SCALE_FACTOR.MOBILE}px;
    height: ${A4.HEIGHT * SCALE_FACTOR.MOBILE}px;
    padding: ${A4.PADDING * SCALE_FACTOR.MOBILE}px;
  }

  @media print {
    width: ${A4.WIDTH}mm;
    height: ${A4.HEIGHT}mm;
    box-shadow: none;
  }
`

const listItemStyles = (width: number, height: number) => css`
  width: ${width * SCALE_FACTOR.DESKTOP}px;
  height: ${height * SCALE_FACTOR.DESKTOP}px;
  box-shadow: inset 0 0 0 1px #eee;

  @media screen and (max-width: 768px) {
    width: ${width * SCALE_FACTOR.MOBILE}px;
    height: ${height * SCALE_FACTOR.MOBILE}px;
  }

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

const buttonListStyles = css`
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
`

const buttonStyles = css`
  padding: 12px 8px;
`
