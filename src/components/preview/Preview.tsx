import { MutableRefObject, useState } from 'react'
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
  const MAX_IMAGES_PER_PAGE =
    width && height
      ? Math.floor((A4.WIDTH - A4.PADDING * 2) / width) *
        Math.floor((A4.HEIGHT - A4.PADDING * 2) / height)
      : 0
  const array = Array.from({ length: MAX_IMAGES_PER_PAGE })

  const imagePages = []
  for (let i = 0; i < imgList.length; i += MAX_IMAGES_PER_PAGE) {
    imagePages.push(imgList.slice(i, i + MAX_IMAGES_PER_PAGE))
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
              <div css={slideStyles(activePage)}>
                <div key={idx} css={wrapperStyles}>
                  <ul css={listStyles}>
                    {imagePage.map((img, idx) => (
                      <li key={idx} css={listItemStyles(width, height)}>
                        <img src={img} css={imageStyles} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div css={wrapperStyles}>
              <ul css={listStyles}>
                {array.map((_, index) => (
                  <li key={index} css={listItemStyles(width, height)}></li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
      {imagePages.length > 1 && (
        <ul css={buttonListStyles}>
          {imagePages.map((_, idx: number) => (
            <li key={idx}>
              <button onClick={() => handlePageButtonClick(idx)}>
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
  width: ${A4.WIDTH * SCALE_FACTOR.DESKTOP + 24}px;
  height: ${A4.HEIGHT * SCALE_FACTOR.DESKTOP + 24}px;
`

const slideWrapperStyles = css`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #eee;
  overflow: hidden;

  @media print {
    display: block;
    width: ${A4.WIDTH}mm;
    height: ${A4.HEIGHT}mm;
    background-color: transparent;
    overflow: visible;
  }
`

const slideStyles = (idx: number) => css`
  width: 100%;
  height: 100%;
  transform: translateX(-${idx * 100}%);
`

const wrapperStyles = css`
  width: 100%;
  height: 100%;
  padding: 12px;
  background-color: #eee;

  @media print {
    background-color: transparent;
    transform: none;
  }
`

const listStyles = css`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 5px;
  width: ${A4.WIDTH * SCALE_FACTOR.DESKTOP}px;
  height: ${A4.HEIGHT * SCALE_FACTOR.DESKTOP}px;
  padding: ${A4.PADDING * SCALE_FACTOR.DESKTOP}px;
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

const buttonListStyles = css`
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  padding: 12px;
`
