/* eslint space-before-function-paren: 0 */
import { ERRORS, SUCCESS } from '../mocks/messages.js'

function validateObject(fields, strict) {
  if (fields === null || fields === undefined || typeof (fields) !== 'object') {
    if (!strict) {
      throw new Error(ERRORS.UPDATE_MORE_FIELDS)
    }
    throw new Error(ERRORS.REQUIRED_FIELDS)
  }
  return { msg: SUCCESS.OBJECT_RECEIVED }
}

function estrictInputs(fields) {
  const {
    title,
    description,
    price,
    thumbnail,
    stock,
    code
  } = fields

  if (description === undefined || description === null) {
    throw new Error(ERRORS.EMPTY_DESCRIPTION)
  }
  if (typeof (description) !== 'string') {
    throw new Error(ERRORS.DESCRIPTION)
  }

  if (thumbnail === undefined || thumbnail === null) {
    throw new Error(ERRORS.EMPTY_THUMBNAIL)
  }
  if (typeof (thumbnail) !== 'string') {
    throw new Error(ERRORS.THUMBNAIL)
  }

  if (title === undefined || title === null) {
    throw new Error(ERRORS.EMPTY_TITLE)
  }
  if (typeof (title) !== 'string') {
    throw new Error(ERRORS.TITLE)
  }

  if (price === undefined || price === null) {
    throw new Error(ERRORS.EMPTY_PRICE)
  }
  if (typeof (price) !== 'number') {
    throw new Error(ERRORS.PRICE)
  }

  // This fields could be empty, null or undefined

  if (stock !== undefined && stock !== null) {
    if (typeof (stock) !== 'number') {
      throw new Error(ERRORS.STOCK)
    }
  }

  if (code !== undefined && code !== null) {
    if (typeof (code) !== 'string') {
      throw new Error(ERRORS.CODE)
    }
  }
}

// All fields could be empty, null or undefined
function looseInputs(fields) {
  if (fields.description !== undefined && fields.description !== null) {
    if (typeof (fields.description) !== 'string') {
      throw new Error(ERRORS.DESCRIPTION)
    }
  }

  if (fields.thumbnail !== undefined && fields.thumbnail !== null) {
    if (typeof (fields.thumbnail) !== 'string') {
      throw new Error(ERRORS.THUMBNAIL)
    }
  }

  if (fields.title !== undefined && fields.title !== null) {
    if (typeof (fields.title) !== 'string') {
      throw new Error(ERRORS.TITLE)
    }
  }

  if (fields.price !== undefined && fields.price !== null) {
    if (typeof (fields.price) !== 'number') {
      throw new Error(ERRORS.PRICE)
    }
  }

  if (fields.stock !== undefined && fields.stock !== null) {
    if (typeof (fields.stock) !== 'number') {
      throw new Error(ERRORS.STOCK)
    }
  }
}

export async function validateInputs(fields, options) {
  try {
    validateObject(fields, options.strict)

    if (options.strict) estrictInputs(fields)
    if (!options.strict) looseInputs(fields)
  } catch (e) {
    return {
      msg: e,
      error: true
    }
  }

  return {
    msg: SUCCESS.FIELDS,
    error: false
  }
}

export function searchMatch(evalCode, arr) {
  try {
    const matchId = arr.some((el) => el.code === evalCode)
    if (matchId) throw new Error(`${ERRORS.FIELD_EXIST} Code.`)
  } catch (e) {
    return { msg: e, error: true }
  }

  return {
    msg: SUCCESS.FIELD,
    error: false
  }
}
