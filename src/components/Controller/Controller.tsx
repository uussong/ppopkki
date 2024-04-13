import { useEffect, useState } from 'react'
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

  const [isSubmitted, setIsSubmitted] = useState(false)

  const onSubmit: SubmitHandler<FormInput> = ({ width, height }) => {
    setHeight(height)
    setWidth(width)
    setIsSubmitted(true)
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
        <div css={inputGroupStyles}>
          <div>
            <input
              type="number"
              placeholder="너비"
              {...register('width', {
                required: true,
                min: 1,
                max: A4.WIDTH - A4.PADDING * 2,
              })}
              css={inputStyles}
            />
            <span>mm</span>
          </div>
          <div>
            <input
              type="number"
              placeholder="높이"
              {...register('height', {
                required: true,
                min: 1,
                max: A4.HEIGHT - A4.PADDING * 2,
              })}
              css={inputStyles}
            />
            <span>mm</span>
          </div>
        </div>
        {errors.width?.type === 'required' && <p>너비를 입력해주세요</p>}
        {errors.width?.type === 'max' && (
          <p>최대 너비는 {A4.WIDTH - A4.PADDING * 2}mm입니다</p>
        )}
        {errors.height?.type === 'required' && <p>높이를 입력해주세요</p>}
        {errors.height?.type === 'max' && (
          <p>최대 높이는 {A4.HEIGHT - A4.PADDING * 2}mm입니다</p>
        )}
        <button type="submit" disabled={!width || !height} css={buttonStyles}>
          크기 확인하기
        </button>
      </form>
      <label htmlFor="image" css={labelStyles(!isSubmitted)}>
        사진 선택
      </label>
      <input
        type="file"
        id="image"
        accept="image/*"
        {...register('imgFile')}
        multiple
        disabled={!isSubmitted}
      />
    </section>
  )
}

export default Controller

const sectionStyles = css`
  grid-area: input;
  display: flex;
  flex-direction: column;
  gap: 25px;
`

const inputGroupStyles = css`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`

const inputStyles = css`
  width: 40px;
  border: 1px solid #eee;
  border-radius: 6px;
  margin-right: 5px;
  padding: 14px 6px;
`

const buttonStyles = css`
  width: 100%;
  border: 2px solid #eee;
  border-radius: 6px;
  padding: 14px 0;
  text-align: center;

  :disabled {
    color: #999;
  }
`

const labelStyles = (isDisabled: boolean) => css`
  display: block;
  padding: 14px 0;
  text-align: center;
  color: ${isDisabled ? '#999' : '#000'};
  border: 2px solid #eee;
  border-radius: 6px;
  cursor: ${isDisabled ? 'defalut' : 'pointer'};
`
