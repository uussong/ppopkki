import { SubmitHandler, useForm } from 'react-hook-form'
import { A4 } from '../../constants/paper'

interface SizeInputGroupProps {
  setWidth: (width: number) => void
  setHeight: (width: number) => void
}

interface FormInput {
  width: number
  height: number
}

function SizeInputGroup({ setWidth, setHeight }: SizeInputGroupProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInput>()

  const onSubmit: SubmitHandler<FormInput> = ({ width, height }) => {
    setWidth(width)
    setHeight(height)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="number"
        placeholder="너비"
        {...register('width', {
          required: true,
          min: 1,
          max: A4.WIDTH - A4.PADDING * 2,
        })}
      />
      {errors.width?.type === 'required' && <p>너비를 입력해주세요</p>}
      {errors.width?.type === 'max' && (
        <p>최대 너비는 {A4.WIDTH - A4.PADDING * 2}mm입니다</p>
      )}
      <input
        type="number"
        placeholder="높이"
        {...register('height', {
          required: true,
          min: 1,
          max: A4.HEIGHT - A4.PADDING * 2,
        })}
      />
      {errors.height?.type === 'required' && <p>너비를 입력해주세요</p>}
      {errors.height?.type === 'max' && (
        <p>최대 너비는 {A4.HEIGHT - A4.PADDING * 2}mm입니다</p>
      )}
      <input type="submit" />
    </form>
  )
}

export default SizeInputGroup
