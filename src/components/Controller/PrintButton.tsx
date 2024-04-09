import { css } from '@emotion/react'

interface PrintButtonProps {
  handlePrint: () => void
  disabled: boolean
}

function PrintButton({ handlePrint, disabled }: PrintButtonProps) {
  return (
    <section css={styles}>
      <button onClick={handlePrint} disabled={disabled}>
        뽑기
      </button>
    </section>
  )
}

export default PrintButton

const styles = css`
  grid-area: print;
`
