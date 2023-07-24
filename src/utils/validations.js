export function validateQuantity (value) {
  const num = Number(value)
  if (isNaN(num)) {
    return { error: '"quantity" is not a valid number' }
  }
  return { error: undefined }
}
