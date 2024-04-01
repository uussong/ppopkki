interface ImageListProps {
  imgList: string[]
}

function ImageList({ imgList }: ImageListProps) {
  return (
    <>
      {imgList.map((img, idx) => (
        <img key={idx} src={img} />
      ))}
    </>
  )
}

export default ImageList
