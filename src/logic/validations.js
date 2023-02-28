/* eslint space-before-function-paren: 0 */

const ERRORS = {
  REQUIRED_OBJECT: '[ERROR 400]: Expected object.',
  REQUIRED_FIELDS: '[ERROR 400]: Expected object with properties: title, description, thumbnail, price and stock',
  UPDATE_MORE_FIELDS: '[ERROR 400]: expected object with one or more properties to change (title, description, thumbnail, price, stock)',
  EMPTY_DESCRIPTION: '[ERROR 400]: The field "description" is missing, null or undefined.',
  EMPTY_THUMBNAIL: '[ERROR 400]: The field "thumbnail" is missing, null or undefined.',
  EMPTY_TITLE: '[ERROR 400]: The field "title" is missing, null or undefined.',
  EMPTY_PRICE: '[ERROR 400]: The field "price" is missing, null or undefined.',
  DESCRIPTION: '[ERROR 400]: The field "description" must be a string.',
  THUMBNAIL: '[ERROR 400]: The field "thumbnail" must be a string.',
  TITLE: '[ERROR 400]: The field "title" must be a string.',
  PRICE: '[ERROR 400]: The field "price" must be a number.',
  STOCK: '[ERROR 400]: The field "stock" must be a number.',
  CODE: '[ERROR 400]: The field "code" must be a string.',
  FIELD_EXIST: '[ERROR 400]: There is a product with the same'
}

const SUCCESS = {
  FIELDS: '[STATUS 200]: Fields ok',
  FIELD: '[STATUS 200]: Field ok'
}

function validateObject(fields, strict) {
  if (fields === null || fields === undefined || typeof (fields) !== 'object') {
    if (!strict) {
      throw new Error(ERRORS.UPDATE_MORE_FIELDS)
    }
    throw new Error(ERRORS.REQUIRED_FIELDS)
  } else {
    return { error: false }
  }
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

export function validateInputs(fields, strict = true) {
  try {
    validateObject(fields, strict)

    if (strict) return estrictInputs(fields)
    if (!strict) return looseInputs(fields)

    return {
      msg: SUCCESS.FIELDS,
      error: false
    }
  } catch (e) {
    return {
      msg: e,
      error: true
    }
  }
}

function idMatch(evalId, arr) {
  const matchId = arr.some((el) => el.id === evalId)
  if (matchId) throw new Error(`${ERRORS.FIELD_EXIST} Id.`)
  return false
}

function codeMatch(evalCode, arr) {
  const matchId = arr.some((el) => el.id === evalCode)
  if (matchId) throw new Error(`${ERRORS.FIELD_EXIST} Code.`)
  return false
}

export function searchMatch(evalValues, arr) {
  try {
    idMatch(evalValues.id, arr)
    codeMatch(evalValues.id, arr)
  } catch (e) {
    return { msg: e, error: true }
  }

  return {
    msg: SUCCESS.FIELD
  }
}
