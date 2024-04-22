import { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { css } from '@emotion/react'
import Controller from './components/controller/Controller'
import Preview from './components/preview/Preview'
import PrintButton from './components/controller/PrintButton'

function App() {
  const printRef = useRef(null)
  const [imgList, setImgList] = useState<string[]>([])
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  })

  return (
    <main css={mainStyles}>
      <div css={contentWrapperStyles}>
        <Controller
          setWidth={(width: number) => setWidth(width)}
          setHeight={(height: number) => setHeight(height)}
          setImgList={(imgList) => {
            setImgList((prevData) => [...prevData, ...imgList])
          }}
        />
        <Preview
          printRef={printRef}
          imgList={imgList}
          width={width}
          height={height}
        />
        <PrintButton
          handlePrint={handlePrint}
          disabled={width === 0 || height === 0 || imgList.length === 0}
        />
      </div>
    </main>
  )
}

export default App

const mainStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 50px;

  @media screen and (max-width: 576px) {
    padding: 25px;
  }
`

const contentWrapperStyles = css`
  display: grid;
  grid-template-areas:
    'input preview'
    'print preview';
  grid-template-columns: 2fr 3fr;
  gap: 80px;
  height: 100%;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
`
