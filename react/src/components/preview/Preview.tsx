import { MutableRefObject, useCallback, useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { A4, SCALE_FACTOR } from '../../constants/paper'
import { useDropzone } from 'react-dropzone'
import Pagination from './Pagination'
import { calculateMaxImagesPerPage } from '../../utils/utils'

interface PreviewProps {
  printRef: MutableRefObject<null>
  imgList: string[]
  width: number
  height: number
  setImgList: (imgList: string[]) => void
}

function Preview({
  printRef,
  imgList,
  width,
  height,
  setImgList,
}: PreviewProps) {
  const [activePage, setActivePage] = useState(0)
  const [maxImagesPerPage, setMaxImagesPerPage] = useState(0)

  useEffect(() => {
    if (width && height) {
      const maxImagesPerPage = calculateMaxImagesPerPage(width, height)
      setMaxImagesPerPage(maxImagesPerPage)
    }
  }, [width, height])

  const array = Array.from({ length: maxImagesPerPage })
  const imagePages: string[][] = []
  for (let i = 0; i < imgList.length; i += maxImagesPerPage) {
    imagePages.push(imgList.slice(i, i + maxImagesPerPage))
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const urlList: string[] = []
      for (const file of acceptedFiles) {
        const url = URL.createObjectURL(file)
        urlList.push(url)
      }
      setImgList(urlList)
    },
    [setImgList],
  )
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  })

  return (
    <section css={sectionStyles}>
      <div ref={printRef}>
        {imgList.length > 0 ? (
          <div css={slideWrapperStyles} {...getRootProps()}>
            {imagePages.map((imagePage, idx) => (
              <div key={idx} css={slideStyles(activePage)}>
                <ul css={listStyles}>
                  {imagePage.map((img, idx) => (
                    <li key={idx} css={listItemStyles(width, height)}>
                      <img src={img} css={imageStyles} />
                      <input {...getInputProps()} />
                    </li>
                  ))}
                  <p css={directionStyles}>
                    출력할 이미지를 여기에 끌어놓거나 클릭해 선택하세요
                  </p>
                </ul>
              </div>
            ))}
          </div>
        ) : width && height > 0 ? (
          <div {...getRootProps()}>
            <ul css={listStyles}>
              {array.map((_, index) => (
                <li key={index} css={listItemStyles(width, height)}></li>
              ))}
              <input {...getInputProps()} />
              <p css={directionStyles}>
                출력할 이미지를 여기에 끌어놓거나 클릭해 선택하세요
              </p>
            </ul>
          </div>
        ) : (
          <>
            <div css={listStyles}>
              <p css={directionStyles}>
                출력할 이미지를 여기에 끌어놓거나 클릭해 선택하세요
              </p>
            </div>
          </>
        )}
      </div>

      {imagePages.length > 1 && (
        <Pagination
          imagePages={imagePages}
          setActivePage={(idx) => setActivePage(idx)}
        />
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
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: ${5 * SCALE_FACTOR.DESKTOP}px;
  width: ${A4.WIDTH * SCALE_FACTOR.DESKTOP}px;
  height: ${A4.HEIGHT * SCALE_FACTOR.DESKTOP}px;
  padding: ${A4.PADDING * SCALE_FACTOR.DESKTOP}px;
  background-color: #fff;
  box-shadow: inset 0 0 0 2px #eee;
  cursor: pointer;

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
  box-shadow: inset 0 0 0 1px #d3d3d3;
  cursor: pointer;

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

const directionStyles = css`
  position: absolute;
  font-size: 14px;
  bottom: 4px;
  color: #999;

  @media screen and (max-width: 768px) {
    font-size: 12px;
    bottom: 2px;
  }

  @media print {
    display: none;
  }
`
