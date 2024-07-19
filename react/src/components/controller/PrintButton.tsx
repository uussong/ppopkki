import { css } from '@emotion/react'

interface PrintButtonProps {
  handlePrint: () => void
  disabled: boolean
}

function PrintButton({ handlePrint, disabled }: PrintButtonProps) {
  return (
    <section css={sectionStyles}>
      <button onClick={handlePrint} disabled={disabled} css={buttonStyles}>
        뽑기
      </button>
    </section>
  )
}

export default PrintButton

const sectionStyles = css`
  grid-area: print;
  display: flex;
  align-items: flex-end;
`

const buttonStyles = css`
  width: 100%;
  border: 2px solid #eee;
  border-radius: 6px;
  padding: 14px 0;
  text-align: center;

  :disabled {
    color: #999;
  }
`
