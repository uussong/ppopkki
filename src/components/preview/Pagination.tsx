import { ChangeEvent, useState } from 'react'
import { css } from '@emotion/react'

interface PaginationProps {
  imagePages: string[][]
  setActivePage: (idx: number) => void
}

function Pagination({ imagePages, setActivePage }: PaginationProps) {
  const [pageIndex, setPageIndex] = useState(1)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const newPageIndex = parseInt(value)

    if (
      !isNaN(newPageIndex) &&
      newPageIndex >= 1 &&
      newPageIndex <= imagePages.length
    ) {
      setPageIndex(newPageIndex)
      setActivePage(newPageIndex - 1)
    } else {
      setPageIndex(
        newPageIndex < 1
          ? 1
          : newPageIndex > imagePages.length
            ? imagePages.length
            : newPageIndex,
      )
    }
  }

  const handlePreviousClick = () => {
    const newPageIndex = pageIndex - 1
    if (newPageIndex >= 1) {
      setPageIndex(newPageIndex)
      setActivePage(newPageIndex - 1)
    }
  }

  const handleNextClick = () => {
    const newPageIndex = pageIndex + 1
    if (newPageIndex <= imagePages.length) {
      setPageIndex(newPageIndex)
      setActivePage(newPageIndex - 1)
    }
  }

  return (
    <div css={paginationStyles}>
      <button
        onClick={handlePreviousClick}
        disabled={pageIndex === 1}
        css={buttonStyles}
      >
        이전
      </button>
      <input
        type="number"
        min={1}
        max={imagePages.length}
        value={pageIndex}
        onChange={handleInputChange}
        css={inputStyles}
      />
      <span>&#47;</span>
      <span css={spanStyles}>{imagePages.length}</span>
      <button
        onClick={handleNextClick}
        disabled={pageIndex === imagePages.length}
        css={buttonStyles}
      >
        다음
      </button>
    </div>
  )
}

export default Pagination

const paginationStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  padding: 10px 0;
`

const inputStyles = css`
  max-width: 16px;
  font-size: 14px;
  text-align: center;
  padding: 2px 1px;

  :focus {
    box-shadow: inset 0 -1px 0 0 #999;
  }
`

const spanStyles = css`
  max-width: 16px;
  padding: 2px 1px;
`

const buttonStyles = css`
  padding: 10px;
  border-radius: 6px;

  :disabled {
    color: #999;
  }
`
