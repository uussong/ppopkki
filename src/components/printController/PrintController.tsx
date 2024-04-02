import { MutableRefObject } from 'react'
import { useReactToPrint } from 'react-to-print'
import PrintButton from './PrintButton'

interface PrintControllerProps {
  printRef: MutableRefObject<null>
}

function PrintController({ printRef }: PrintControllerProps) {
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  })

  return (
    <section>
      <PrintButton handlePrint={handlePrint} />
    </section>
  )
}

export default PrintController
