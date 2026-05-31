export function makeDisplayFileName(fileName) {
  const cleanName = String(fileName || 'fotodeck-display.jpg')
    .trim()
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase()

  return `${cleanName || 'fotodeck-display'}-display.jpg`
}

export async function makeDisplayImageFile(file) {
  const maxEdge = 1800
  const jpegQuality = 0.78

  if (!file || !file.type || !file.type.startsWith('image/')) {
    return file
  }

  try {
    const imageBitmap = await createImageBitmap(file)
    const longestEdge = Math.max(imageBitmap.width, imageBitmap.height)
    const scale = longestEdge > maxEdge ? maxEdge / longestEdge : 1
    const nextWidth = Math.max(1, Math.round(imageBitmap.width * scale))
    const nextHeight = Math.max(1, Math.round(imageBitmap.height * scale))
    const canvas = document.createElement('canvas')

    canvas.width = nextWidth
    canvas.height = nextHeight

    const context = canvas.getContext('2d')

    if (!context) {
      imageBitmap.close()
      return file
    }

    context.drawImage(imageBitmap, 0, 0, nextWidth, nextHeight)
    imageBitmap.close()

    const blob = await new Promise((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg', jpegQuality)
    })

    if (!blob) {
      return file
    }

    return new File([blob], makeDisplayFileName(file.name), {
      type: 'image/jpeg',
      lastModified: file.lastModified || Date.now(),
    })
  } catch {
    return file
  }
}