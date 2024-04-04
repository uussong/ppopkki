import SizeInputGroup from './SizeInputGroup'
import ImageInput from './ImageInput'
import { css } from '@emotion/react'

interface ControllerProps {
  setWidth: (width: number) => void
  setHeight: (width: number) => void
  setImgList: (imgList: string[]) => void
}

function Controller({ setWidth, setHeight, setImgList }: ControllerProps) {
  return (
    <section css={sectionStyles}>
      <SizeInputGroup setWidth={setWidth} setHeight={setHeight} />
      <ImageInput setImgList={setImgList} />
    </section>
  )
}

export default Controller

const sectionStyles = css`
  grid-area: input;
`
