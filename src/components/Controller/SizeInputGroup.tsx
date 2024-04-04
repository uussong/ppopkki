import { ChangeEvent } from 'react'

interface SizeInputGroupProps {
  setWidth: (width: number) => void
  setHeight: (width: number) => void
}

function SizeInputGroup({ setWidth, setHeight }: SizeInputGroupProps) {
  const handleWidth = (e: ChangeEvent<HTMLInputElement>) => {
    const width = parseInt(e.target.value) || 0
    setWidth(width)
  }

  const handleHeight = (e: ChangeEvent<HTMLInputElement>) => {
    const height = parseInt(e.target.value) || 0
    setHeight(height)
  }

  return (
    <>
      <input type="number" placeholder="너비" onChange={handleWidth} />
      <input type="number" placeholder="높이" onChange={handleHeight} />
    </>
  )
}

export default SizeInputGroup
