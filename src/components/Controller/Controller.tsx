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
  width: string
  height: string
  imgFile: FileList
}

function Controller({ setWidth, setHeight, setImgList }: ControllerProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormInput>({ mode: 'onBlur' })
  const width = watch('width')
  const height = watch('height')
  const imgFile = watch('imgFile')

  const [isSubmitted, setIsSubmitted] = useState(false)

  const onSubmit: SubmitHandler<FormInput> = ({ width, height }) => {
    setHeight(parseInt(height))
    setWidth(parseInt(width))
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
            <label htmlFor="width">너비</label>
            <input
              type="number"
              id="width"
              placeholder="너비"
              {...register('width', {
                required: '너비를 입력해주세요',
                min: {
                  value: 10,
                  message: `10~${A4.WIDTH - A4.PADDING * 2}의 크기만 가능해요`,
                },
                max: {
                  value: A4.WIDTH - A4.PADDING * 2,
                  message: `10~${A4.WIDTH - A4.PADDING * 2}의 크기만 가능해요`,
                },
              })}
              css={inputStyles}
            />
            <span>mm</span>
          </div>
          <div>
            <label htmlFor="height">높이</label>
            <input
              type="number"
              id="height"
              placeholder="높이"
              {...register('height', {
                required: '높이를 입력해주세요',
                min: {
                  value: 10,
                  message: `10~${A4.HEIGHT - A4.PADDING * 2}의 크기만 가능해요`,
                },
                max: {
                  value: A4.HEIGHT - A4.PADDING * 2,
                  message: `10~${A4.HEIGHT - A4.PADDING * 2}의 크기만 가능해요`,
                },
              })}
              css={inputStyles}
            />
            <span>mm</span>
          </div>
        </div>
        {errors.width && <p css={errorMessageStyles}>{errors.width.message}</p>}
        {errors.height && (
          <p css={errorMessageStyles}>{errors.height.message}</p>
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
        disabled={!isSubmitted || !!errors.width || !!errors.height}
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
  flex-direction: column;
  gap: 10px;
  margin-bottom: 12px;
`

const inputStyles = css`
  width: 40px;
  border: 1px solid #eee;
  border-radius: 6px;
  margin: 0 5px;
  padding: 14px 6px;
`

const errorMessageStyles = css`
  margin: 12px 0;
  font-size: 14px;
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
  color: ${isDisabled && '#999'};
  border: 2px solid #eee;
  border-radius: 6px;
  cursor: ${isDisabled ? 'defalut' : 'pointer'};
`
