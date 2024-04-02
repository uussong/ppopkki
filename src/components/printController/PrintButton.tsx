interface PrintButtonProps {
  handlePrint: () => void
}

function PrintButton({ handlePrint }: PrintButtonProps) {
  return <button onClick={handlePrint}>뽑기</button>
}

export default PrintButton
