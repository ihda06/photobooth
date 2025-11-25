import { toPng, toJpeg } from 'html-to-image'

export async function downloadPhotoStrip(element: HTMLElement, format: 'png' | 'jpeg' = 'png', filename: string = 'photobooth-strip') {
  try {
    const dataUrl = format === 'png' 
      ? await toPng(element, { quality: 1.0, pixelRatio: 2 })
      : await toJpeg(element, { quality: 0.9, pixelRatio: 2 })
    
    const link = document.createElement('a')
    link.download = `${filename}.${format}`
    link.href = dataUrl
    link.click()
  } catch (err) {
    console.error('Failed to download image:', err)
    throw err
  }
}
