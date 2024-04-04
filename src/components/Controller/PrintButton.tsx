import { css } from '@emotion/react'

interface PrintButtonProps {
  handlePrint: () => void
}

function PrintButton({ handlePrint }: PrintButtonProps) {
  return (
    <section css={styles}>
      <button onClick={handlePrint}>뽑기</button>
    </section>
  )
}

export default PrintButton

const styles = css`
  grid-area: print;
`
