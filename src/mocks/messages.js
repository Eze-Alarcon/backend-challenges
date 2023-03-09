/* eslint space-before-function-paren: 0 */

const STATUS_CODE = {
  CLIENT_ERROR: {
    BAD_REQUEST: 400,
    NOT_FOUND: 404
  },
  SUCCESSFUL_RESPONSE: {
    OK: 200,
    CREATED: 201
  },
  SERVER_ERROR: {
    INTERNAL_ERROR: 500,
    NOT_IMPLEMENTED: 501
  }
}

const ERRORS = {
  REQUIRED_OBJECT: {
    message: '[ERROR]: Expected object.',
    status: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    code: 'REQUIRED_OBJECT'
  },
  REQUIRED_FIELDS: {
    message: '[ERROR]: Expected object with properties: title, description, thumbnail, price and stock',
    status: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    code: 'REQUIRED_FIELDS'
  },
  UPDATE_MORE_FIELDS: {
    message: '[ERROR]: Expected object with one or more properties to change (title, description, thumbnail, price, stock)',
    status: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    code: 'UPDATE_MORE_FIELDS'
  },
  EMPTY_DESCRIPTION: {
    message: '[ERROR]: The field "description" is missing, null or undefined.',
    status: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    code: 'EMPTY_DESCRIPTION'
  },
  EMPTY_THUMBNAIL: {
    message: '[ERROR]: The field "thumbnail" is missing, null or undefined.',
    status: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    code: 'EMPTY_THUMBNAIL'
  },
  EMPTY_TITLE: {
    message: '[ERROR]: The field "title" is missing, null or undefined.',
    status: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    code: 'EMPTY_TITLE'
  },
  EMPTY_PRICE: {
    message: '[ERROR]: The field "price" is missing, null or undefined.',
    status: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    code: 'EMPTY_PRICE'
  },
  DESCRIPTION: {
    message: '[ERROR]: The field "description" must be a string.',
    status: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    code: 'DESCRIPTION'
  },
  THUMBNAIL: {
    message: '[ERROR]: The field "thumbnail" must be a string.',
    status: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    code: 'THUMBNAIL'
  },
  TITLE: {
    message: '[ERROR]: The field "title" must be a string.',
    status: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    code: 'TITLE'
  },
  PRICE: {
    message: '[ERROR]: The field "price" must be a number.',
    status: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    code: 'PRICE'
  },
  STOCK: {
    message: '[ERROR]: The field "stock" must be a number.',
    status: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    code: 'STOCK'
  },
  CODE: {
    message: '[ERROR]: The field "code" must be a string.',
    status: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    code: 'CODE'
  },
  FIELD_EXIST: {
    message: '[ERROR]: There is a product with the same Code',
    status: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    code: 'FIELD_EXIST'
  },
  NOT_FOUND: {
    message: '[ERROR]: Product not found',
    status: STATUS_CODE.CLIENT_ERROR.NOT_FOUND,
    code: 'NOT_FOUND'
  },
  QUERY_NOT_NUMBER: {
    message: '[ERROR]: Limit and page must be a number',
    status: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    code: 'QUERY_NOT_NUMBER'
  },
  QUERY_ID: {
    message: '[ERROR]: Searched id must be a number',
    status: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    code: 'QUERY_ID'
  }
}

const SUCCESS = {
  FIELDS: {
    message: '[STATUS]: Fields ok',
    status: STATUS_CODE.SUCCESSFUL_RESPONSE.OK
  },
  FIELD: {
    message: '[STATUS]: Field ok',
    status: STATUS_CODE.SUCCESSFUL_RESPONSE.OK
  },
  OBJECT_RECEIVED: {
    message: '[STATUS]: Object received ok',
    status: STATUS_CODE.SUCCESSFUL_RESPONSE.OK
  },
  CREATED: {
    message: '[STATUS]: Item created successfully',
    status: STATUS_CODE.SUCCESSFUL_RESPONSE.CREATED
  },
  UPDATED: {
    message: '[STATUS]: Item updated successfully',
    status: STATUS_CODE.SUCCESSFUL_RESPONSE.OK
  },
  DELETED: {
    message: '[STATUS]: Item removed successfully',
    status: STATUS_CODE.SUCCESSFUL_RESPONSE.OK
  },
  GET: {
    message: '[STATUS]: Item found successfully',
    status: STATUS_CODE.SUCCESSFUL_RESPONSE.OK
  }
}

export { ERRORS, SUCCESS }
