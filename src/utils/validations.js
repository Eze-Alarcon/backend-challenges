// Error messages
import { CREATE_PRODUCT_ERRORS } from './errors.messages.js'

export function validateQuantity (value) {
  const num = Number(value)
  if (typeof (num) !== 'number' || isNaN(num)) {
    throw new Error(CREATE_PRODUCT_ERRORS.INCORRECT_FIELD_TYPE_NUMBER.ERROR_CODE)
  }
}
