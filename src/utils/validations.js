// Error messages
import { STATUS_CODE, CREATE_PRODUCT_ERRORS } from './errors.messages.js'

function validateObject (fields, strict) {
  if (fields === null || typeof (fields) !== 'object' || Array.isArray(fields)) {
    if (!strict) throw new Error(CREATE_PRODUCT_ERRORS.UPDATE_MORE_FIELDS.ERROR_CODE)
    else throw new Error(CREATE_PRODUCT_ERRORS.REQUIRED_FIELDS.ERROR_CODE)
  }
  return STATUS_CODE.SUCCESS.OK
}

function estrictInputs (fields) {
  const {
    title,
    description,
    price,
    stock,
    status,
    code
  } = fields

  if (
    typeof (description) !== 'string' &&
    typeof (title) !== 'string'
  ) {
    throw new Error(CREATE_PRODUCT_ERRORS.INCORRECT_FIELD_TYPE_STRING.ERROR_CODE)
  }

  if (typeof (price) !== 'number') {
    throw new Error(CREATE_PRODUCT_ERRORS.INCORRECT_FIELD_TYPE_NUMBER.ERROR_CODE)
  }

  // This fields could be empty, null or undefined

  if ((code !== undefined && code !== null) && typeof (code) !== 'string') {
    throw new Error(CREATE_PRODUCT_ERRORS.INCORRECT_FIELD_TYPE_STRING.ERROR_CODE)
  }

  if ((stock !== undefined && stock !== null) && typeof (stock) !== 'number') {
    throw new Error(CREATE_PRODUCT_ERRORS.INCORRECT_FIELD_TYPE_NUMBER.ERROR_CODE)
  }

  if ((status !== undefined && status !== null) && typeof (status) !== 'boolean') {
    throw new Error(CREATE_PRODUCT_ERRORS.FIELD_STATUS.ERROR_CODE)
  }
}

// ===== All fields could be empty, null or undefined =====

function looseInputs (fields) {
  const title = fields.title
  const description = fields.description
  const price = fields.price
  const stock = fields.stock
  const status = fields.status

  if ((description !== undefined && description !== null) && typeof (description) !== 'string') {
    throw new Error(CREATE_PRODUCT_ERRORS.INCORRECT_FIELD_TYPE_STRING.ERROR_CODE)
  }

  if ((title !== undefined && title !== null) && typeof (title) !== 'string') {
    throw new Error(CREATE_PRODUCT_ERRORS.INCORRECT_FIELD_TYPE_STRING.ERROR_CODE)
  }

  if ((price !== undefined && price !== null) && typeof (price) !== 'number') {
    throw new Error(CREATE_PRODUCT_ERRORS.INCORRECT_FIELD_TYPE_NUMBER.ERROR_CODE)
  }

  if ((stock !== undefined && stock !== null) && typeof (stock) !== 'number') {
    throw new Error(CREATE_PRODUCT_ERRORS.INCORRECT_FIELD_TYPE_NUMBER.ERROR_CODE)
  }

  if ((status !== undefined && status !== null) && typeof (status) !== 'boolean') {
    throw new Error(CREATE_PRODUCT_ERRORS.FIELD_STATUS.ERROR_CODE)
  }
}

export function validateInputs (fields, strictValidation = false) {
  validateObject(fields, strictValidation)

  if (strictValidation) estrictInputs(fields)
  else looseInputs(fields)

  return {
    status_code: STATUS_CODE.SUCCESS.OK,
    error: false
  }
}

export function validateQuantity (value) {
  const num = Number(value)
  if (typeof (num) !== 'number' || isNaN(num)) {
    throw new Error(CREATE_PRODUCT_ERRORS.INCORRECT_FIELD_TYPE_NUMBER.ERROR_CODE)
  }
}
