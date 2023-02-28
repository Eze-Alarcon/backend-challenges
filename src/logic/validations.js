/* eslint space-before-function-paren: 0 */

const ERRORS = {
  REQUIRED_OBJECT: '[ERROR 400]: Expected object.',
  REQUIRED_FIELDS: '[ERROR 400]: Expected object with properties: title, description, thumbnail, price and stock',
  UPDATE_FIELDS: '[ERROR 400]: expected object with one or more properties to change (title, description, thumbnail, price, stock)',
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
      return {
        msg: ERRORS.UPDATE_FIELDS,
        error: true
      }
    }
    return {
      msg: ERRORS.REQUIRED_FIELDS,
      error: true
    }
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
    return {
      msg: ERRORS.EMPTY_DESCRIPTION,
      error: true
    }
  }
  if (typeof (description) !== 'string') {
    return {
      msg: ERRORS.DESCRIPTION,
      error: true
    }
  }

  if (thumbnail === undefined || thumbnail === null) {
    return {
      msg: ERRORS.EMPTY_THUMBNAIL,
      error: true
    }
  }
  if (typeof (thumbnail) !== 'string') {
    return {
      msg: ERRORS.THUMBNAIL,
      error: true
    }
  }

  if (title === undefined || title === null) {
    return {
      msg: ERRORS.EMPTY_TITLE,
      error: true
    }
  }
  if (typeof (title) !== 'string') {
    return {
      msg: ERRORS.TITLE,
      error: true
    }
  }

  if (price === undefined || price === null) {
    return {
      msg: ERRORS.EMPTY_PRICE,
      error: true
    }
  }
  if (typeof (price) !== 'number') {
    return {
      msg: ERRORS.PRICE,
      error: true
    }
  }

  // This fields could be empty, null or undefined

  if (stock !== undefined && stock !== null) {
    if (typeof (stock) !== 'number') {
      return {
        msg: ERRORS.STOCK,
        error: true
      }
    }
  }

  if (code !== undefined && code !== null) {
    if (typeof (code) !== 'string') {
      return {
        msg: ERRORS.CODE,
        error: true
      }
    }
  }

  return {
    msg: SUCCESS.FIELDS,
    error: false
  }
}

// All fields could be empty, null or undefined
function looseInputs(fields) {
  if (fields.description !== undefined && fields.description !== null) {
    if (typeof (fields.description) !== 'string') {
      return {
        msg: ERRORS.DESCRIPTION,
        error: true
      }
    }
  }

  if (fields.thumbnail !== undefined && fields.thumbnail !== null) {
    if (typeof (fields.thumbnail) !== 'string') {
      return {
        msg: ERRORS.THUMBNAIL,
        error: true
      }
    }
  }

  if (fields.title !== undefined && fields.title !== null) {
    if (typeof (fields.title) !== 'string') {
      return {
        msg: ERRORS.TITLE,
        error: true
      }
    }
  }

  if (fields.price !== undefined && fields.price !== null) {
    if (typeof (fields.price) !== 'number') {
      return {
        msg: ERRORS.PRICE,
        error: true
      }
    }
  }

  if (fields.stock !== undefined && fields.stock !== null) {
    if (typeof (fields.stock) !== 'number') {
      return {
        msg: ERRORS.STOCK,
        error: true
      }
    }
  }

  return {
    msg: SUCCESS.FIELDS,
    error: false
  }
}

export function validateInputs(fields, strict = true) {
  const { msg, error } = validateObject(fields, strict)
  if (error) return { msg, error }

  if (strict) return estrictInputs(fields)
  if (!strict) return looseInputs(fields)

  return {
    msg: SUCCESS.FIELDS,
    error: false
  }
}

export function searchMatch(field, value, arr) {
  const match = arr.some((el) => el[field] === value)
  if (match) {
    return {
      msg: `${ERRORS.FIELD_EXIST} ${field}.`,
      error: match
    }
  }
  return {
    msg: SUCCESS.FIELD,
    error: match
  }
}
