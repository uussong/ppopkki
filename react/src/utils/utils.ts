import { A4 } from '../constants/paper'

export function calculateMaxImagesPerPage(
  width: number,
  height: number,
): number {
  const availableWidth = A4.WIDTH - A4.PADDING * 2
  const availableHeight = A4.HEIGHT - A4.PADDING * 2

  const columnCountRemainder = availableWidth % (width + 5)
  const rowCountRemainder = availableHeight % (height + 5)

  const columnCount =
    columnCountRemainder >= width
      ? Math.floor(availableWidth / (width + 5)) +
        Math.floor(columnCountRemainder / width)
      : Math.floor(availableWidth / (width + 5))

  const rowCount =
    rowCountRemainder >= height
      ? Math.floor(availableHeight / (height + 5)) +
        Math.floor(rowCountRemainder / height)
      : Math.floor(availableHeight / (height + 5))

  return columnCount * rowCount
}
