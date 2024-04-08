import { SubmitHandler, useForm } from 'react-hook-form'
import { css } from '@emotion/react'
import { A4 } from '../../constants/paper'

interface ControllerProps {
  setWidth: (width: number) => void
  setHeight: (width: number) => void
  setImgList: (imgList: string[]) => void
}

interface FormInput {
  width: number
  height: number
  imgFile: FileList
}

function Controller({ setWidth, setHeight, setImgList }: ControllerProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInput>()

  const onSubmit: SubmitHandler<FormInput> = ({ width, height, imgFile }) => {
    setHeight(height)
    setWidth(width)
    const urlList: string[] = []
    for (const file of imgFile) {
      const url = URL.createObjectURL(file)
      urlList.push(url)
    }
    setImgList(urlList)
  }

  return (
    <section css={sectionStyles}>
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
        <label htmlFor="image">사진 선택</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          {...register('imgFile')}
          multiple
        />
        <input type="submit" />
      </form>
    </section>
  )
}

export default Controller

const sectionStyles = css`
  grid-area: input;
`
