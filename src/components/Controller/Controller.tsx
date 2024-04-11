import { useEffect } from 'react'
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
    watch,
  } = useForm<FormInput>()
  const width = watch('width')
  const height = watch('height')
  const imgFile = watch('imgFile')

  const onSubmit: SubmitHandler<FormInput> = ({ width, height }) => {
    setHeight(height)
    setWidth(width)
  }

  useEffect(() => {
    if (imgFile && imgFile.length > 0) {
      const urlList: string[] = []
      for (const file of imgFile) {
        const url = URL.createObjectURL(file)
        urlList.push(url)
      }
      setImgList(urlList)
    }
  }, [imgFile])

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
        {errors.height?.type === 'required' && <p>높이를 입력해주세요</p>}
        {errors.height?.type === 'max' && (
          <p>최대 높이는 {A4.HEIGHT - A4.PADDING * 2}mm입니다</p>
        )}
        <input type="submit" />
      </form>
      <label htmlFor="image" css={labelStyles(!width || !height)}>
        사진 선택
      </label>
      <input
        type="file"
        id="image"
        accept="image/*"
        {...register('imgFile')}
        multiple
        disabled={!width || !height}
      />
    </section>
  )
}

export default Controller

const sectionStyles = css`
  grid-area: input;
`

const labelStyles = (isDisabled: boolean) => css`
  cursor: ${isDisabled ? 'defalut' : 'pointer'};
`
