import { ChangeEvent, FormEvent } from 'react'

interface SizeInputGroupProps {
  setWidth: (width: number) => void
  setHeight: (width: number) => void
}

function SizeInputGroup({ setWidth, setHeight }: SizeInputGroupProps) {
  let width = 0
  let height = 0
  const handleWidth = (e: ChangeEvent<HTMLInputElement>) => {
    width = parseInt(e.target.value)
  }

  const handleHeight = (e: ChangeEvent<HTMLInputElement>) => {
    height = parseInt(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (width && height) {
      setWidth(width)
      setHeight(height)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="너비" onChange={handleWidth} />
      <input type="number" placeholder="높이" onChange={handleHeight} />
      <button>입력!</button>
    </form>
  )
}

export default SizeInputGroup
