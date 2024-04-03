import { ChangeEvent, FormEvent, useState } from 'react'

interface SizeInputGroupProps {
  setWidth: (width: number) => void
  setHeight: (width: number) => void
}

function SizeInputGroup({ setWidth, setHeight }: SizeInputGroupProps) {
  const [inputWidth, setInputWidth] = useState(0)
  const [inputHeight, setInputHeight] = useState(0)

  const handleWidth = (e: ChangeEvent<HTMLInputElement>) => {
    const width = parseInt(e.target.value)
    setInputWidth(width)
  }

  const handleHeight = (e: ChangeEvent<HTMLInputElement>) => {
    const height = parseInt(e.target.value)
    setInputHeight(height)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputWidth && inputHeight) {
      setWidth(inputWidth)
      setHeight(inputHeight)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="너비" onChange={handleWidth} />
      <input type="number" placeholder="높이" onChange={handleHeight} />
      <button disabled={!(inputWidth && inputHeight)}>입력!</button>
    </form>
  )
}

export default SizeInputGroup
