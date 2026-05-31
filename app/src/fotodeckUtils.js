export function makeSafeId(value, fallback) {
  const text = value ? String(value).trim().toLowerCase() : ''

  const safe = text
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return safe || fallback
}

export function makeDisplayPhotoUrl(displayKey) {
  if (!displayKey) {
    return ''
  }

  return `/api/display-image?key=${encodeURIComponent(displayKey)}`
}

export function getUploadedTime(photo) {
  return (
    photo.uploaded_at ||
    photo.created_at ||
    photo.inserted_at ||
    photo.saved_at ||
    photo.createdAt ||
    photo.uploadedAt ||
    ''
  )
}

export function getPhotoSortName(photo) {
  return photo?.name || photo?.file_name || photo?.displayKey || photo?.display_key || photo?.id || ''
}

export function sortPhotosFirstFirst(photosToSort) {
  return [...photosToSort].sort((firstPhoto, secondPhoto) =>
    getPhotoSortName(firstPhoto).localeCompare(getPhotoSortName(secondPhoto), undefined, {
      numeric: true,
      sensitivity: 'base',
    })
  )
}

export function priceFromCents(priceCents) {
  const cents = Number(priceCents || 0)

  if (!Number.isFinite(cents) || cents <= 0) {
    return ''
  }

  return (cents / 100).toFixed(2).replace(/\.00$/, '')
}