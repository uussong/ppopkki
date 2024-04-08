import { SubmitHandler, useForm } from 'react-hook-form'

interface ImageInputProps {
  setImgList: (imgList: string[]) => void
}

interface FormInput {
  imgFile: FileList
}

function ImageInput({ setImgList }: ImageInputProps) {
  const { register, handleSubmit } = useForm<FormInput>()

  const onSubmit: SubmitHandler<FormInput> = ({ imgFile }) => {
    const urlList: string[] = []
    for (const file of imgFile) {
      const url = URL.createObjectURL(file)
      urlList.push(url)
    }
    setImgList(urlList)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
  )
}

export default ImageInput
