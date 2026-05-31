export async function readJsonResponse(response) {
  const result = await response.json()

  if (!response.ok || !result.ok) {
    const message = result.error || 'Request failed'

    return {
      ok: false,
      error: message,
      result,
    }
  }

  return {
    ok: true,
    result,
  }
}

export async function fetchPurchasedImages(sessionId) {
  const response = await fetch(`/api/purchased-images?sessionId=${encodeURIComponent(sessionId)}`)
  return readJsonResponse(response)
}

export async function createStripeCheckout({
  collectionId,
  eventId,
  buyerEmail,
  imageIds,
}) {
  const response = await fetch('/api/stripe-create-checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      collectionId,
      eventId,
      buyerEmail,
      imageIds,
    }),
  })

  return readJsonResponse(response)
}

export async function updateCollection({
  collectionId,
  collectionName,
  price,
  watermarkText,
}) {
  const response = await fetch('/api/update-collection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      collectionId,
      collectionName,
      price,
      watermarkText,
    }),
  })

  return readJsonResponse(response)
}

export async function updateGalleryPrice({
  collectionId,
  eventId,
  price,
}) {
  const response = await fetch('/api/update-event-price', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      collectionId,
      eventId,
      price,
    }),
  })

  return readJsonResponse(response)
}

export async function uploadDisplayImage({
  formData,
  signal,
}) {
  const response = await fetch('/api/upload-display', {
    method: 'POST',
    body: formData,
    signal,
  })

  return readJsonResponse(response)
}

export async function fetchImages({
  collectionId,
  eventId,
}) {
  const response = await fetch(
    `/api/images?collectionId=${encodeURIComponent(collectionId)}&eventId=${encodeURIComponent(eventId)}`
  )

  return readJsonResponse(response)
}

export async function fetchCollectionsEvents() {
  const response = await fetch('/api/collections-events')
  return readJsonResponse(response)
}

export async function deleteImage({
  imageId,
}) {
  const response = await fetch('/api/delete-image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      imageId,
    }),
  })

  return readJsonResponse(response)
}

export async function deleteGallery({
  collectionId,
  eventId,
  confirmText,
}) {
  const response = await fetch('/api/delete-event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      collectionId,
      eventId,
      confirmText,
    }),
  })

  return readJsonResponse(response)
}

export async function deleteCollection({
  collectionId,
  confirmText,
}) {
  const response = await fetch('/api/delete-collection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      collectionId,
      confirmText,
    }),
  })

  return readJsonResponse(response)
}

export async function fetchAdminStats() {
  const response = await fetch('/api/admin-stats')
  return readJsonResponse(response)
}
