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

  const onSubmit: SubmitHandler<FormInput> = ({ width, height }) => {
    setHeight(parseInt(height))
    setWidth(parseInt(width))
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
  }, [imgFile, setImgList])

  return (
    <section css={sectionStyles}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div css={inputGroupStyles}>
            <div>
              <label htmlFor="width">너비</label>
              <input
                type="number"
                id="width"
                placeholder={`10~${A4.WIDTH - A4.PADDING * 2}(mm)`}
                {...register('width', {
                  required: '너비를 입력해주세요',
                  min: {
                    value: 10,
                    message: `너비는 10~${A4.WIDTH - A4.PADDING * 2}의 크기만 가능해요`,
                  },
                  max: {
                    value: A4.WIDTH - A4.PADDING * 2,
                    message: `너비는 10~${A4.WIDTH - A4.PADDING * 2}의 크기만 가능해요`,
                  },
                })}
                css={inputStyles}
              />
            </div>
            <span>&times;</span>
            <div>
              <label htmlFor="height">높이</label>
              <input
                type="number"
                id="height"
                placeholder={`10~${A4.HEIGHT - A4.PADDING * 2}(mm)`}
                {...register('height', {
                  required: '높이를 입력해주세요',
                  min: {
                    value: 10,
                    message: `높이는 10~${A4.HEIGHT - A4.PADDING * 2}의 크기만 가능해요`,
                  },
                  max: {
                    value: A4.HEIGHT - A4.PADDING * 2,
                    message: `높이는 10~${A4.HEIGHT - A4.PADDING * 2}의 크기만 가능해요`,
                  },
                })}
                css={inputStyles}
              />
            </div>
          </div>
          {errors.width && (
            <p css={errorMessageStyles}>{errors.width.message}</p>
          )}
          {errors.height && (
            <p css={errorMessageStyles}>{errors.height.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={!width || !height || !!errors.height || !!errors.width}
          css={buttonStyles}
        >
          크기 확인하기
        </button>
      </form>
    </section>
  )
}

export default Controller

const sectionStyles = css`
  grid-area: input;
  min-width: 285px;
`

const inputGroupStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`

const inputStyles = css`
  width: 80px;
  border: 1px solid #eee;
  border-radius: 6px;
  margin: 0 0 0 5px;
  padding: 14px 6px;

  ::placeholder {
    font-size: 14px;
    text-align: center;
  }

  :focus {
    border-color: #999;
  }
`

const errorMessageStyles = css`
  font-size: 14px;
  color: #999;
  margin: 12px 0 0 0;
`

const buttonStyles = css`
  width: 100%;
  border: 2px solid #eee;
  border-radius: 6px;
  padding: 14px 0;
  text-align: center;
  margin: 25px 0 0 0;

  :disabled {
    color: #999;
  }
`
