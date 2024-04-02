import { MutableRefObject } from 'react'
import { useReactToPrint } from 'react-to-print'
import PrintButton from './PrintButton'
import SizeInputGroup from './SizeInputGroup'

interface PrintControllerProps {
  printRef: MutableRefObject<null>
  setWidth: (width: number) => void
  setHeight: (width: number) => void
}

function PrintController({
  printRef,
  setWidth,
  setHeight,
}: PrintControllerProps) {
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  })

  return (
    <section>
      <SizeInputGroup setWidth={setWidth} setHeight={setHeight} />
      <PrintButton handlePrint={handlePrint} />
    </section>
  )
}

export default PrintController
