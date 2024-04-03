import { MutableRefObject } from 'react'
import { useReactToPrint } from 'react-to-print'
import PrintButton from './PrintButton'
import SizeInputGroup from './SizeInputGroup'
import ImageInput from './ImageInput'

interface ControllerProps {
  printRef: MutableRefObject<null>
  setWidth: (width: number) => void
  setHeight: (width: number) => void
  setImgList: (imgList: string[]) => void
}

function Controller({
  printRef,
  setWidth,
  setHeight,
  setImgList,
}: ControllerProps) {
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  })

  return (
    <section>
      <SizeInputGroup setWidth={setWidth} setHeight={setHeight} />
      <PrintButton handlePrint={handlePrint} />
      <ImageInput setImgList={setImgList} />
    </section>
  )
}

export default Controller
