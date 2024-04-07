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
        <PrintButton handlePrint={handlePrint} />
        <Preview
          printRef={printRef}
          imgList={imgList}
          width={width}
          height={height}
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
`

const contentWrapperStyles = css`
  display: grid;
  grid-template-areas:
    'input preview'
    'print preview';
  gap: 50px;
  padding: 0 50px;
  height: 100%;
`
