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
    MESSAGE: '[ERROR]: Expected object.',
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: 'REQUIRED_OBJECT'
  },
  REQUIRED_FIELDS: {
    MESSAGE: '[ERROR]: Expected object with properties: title, description, thumbnail, price and stock',
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: 'REQUIRED_FIELDS'
  },
  UPDATE_MORE_FIELDS: {
    MESSAGE: '[ERROR]: Expected object with one or more properties to change (title, description, thumbnail, price, stock)',
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: 'UPDATE_MORE_FIELDS'
  },
  EMPTY_DESCRIPTION: {
    MESSAGE: '[ERROR]: The field "description" is missing, null or undefined.',
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: 'EMPTY_DESCRIPTION'
  },
  EMPTY_THUMBNAIL: {
    MESSAGE: '[ERROR]: The field "thumbnail" is missing, null or undefined.',
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: 'EMPTY_THUMBNAIL'
  },
  EMPTY_TITLE: {
    MESSAGE: '[ERROR]: The field "title" is missing, null or undefined.',
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: 'EMPTY_TITLE'
  },
  EMPTY_PRICE: {
    MESSAGE: '[ERROR]: The field "price" is missing, null or undefined.',
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: 'EMPTY_PRICE'
  },
  DESCRIPTION: {
    MESSAGE: '[ERROR]: The field "description" must be a string.',
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: 'DESCRIPTION'
  },
  THUMBNAIL: {
    MESSAGE: '[ERROR]: The field "thumbnail" must be a string.',
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: 'THUMBNAIL'
  },
  TITLE: {
    MESSAGE: '[ERROR]: The field "title" must be a string.',
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: 'TITLE'
  },
  PRICE: {
    MESSAGE: '[ERROR]: The field "price" must be a number.',
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: 'PRICE'
  },
  STOCK: {
    MESSAGE: '[ERROR]: The field "stock" must be a number.',
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: 'STOCK'
  },
  FIELD_CODE_EXIST: {
    MESSAGE: '[ERROR]: The field "code" must be a string.',
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: 'FIELD_CODE_EXIST'
  },
  FIELD_EXIST: {
    MESSAGE: '[ERROR]: There is a product with the same Code',
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: 'FIELD_EXIST'
  },
  NOT_FOUND: {
    MESSAGE: '[ERROR]: Product not found',
    STATUS: STATUS_CODE.CLIENT_ERROR.NOT_FOUND,
    ERROR_CODE: 'NOT_FOUND'
  },
  QUERY_NOT_NUMBER: {
    MESSAGE: '[ERROR]: Limit and page must be a number',
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: 'QUERY_NOT_NUMBER'
  },
  QUERY_ID: {
    MESSAGE: '[ERROR]: Searched id must be a number',
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: 'QUERY_ID'
  }
}

const SUCCESS = {
  FIELDS: {
    MESSAGE: 'Fields ok',
    STATUS: STATUS_CODE.SUCCESSFUL_RESPONSE.OK
  },
  FIELD: {
    MESSAGE: 'Field ok',
    STATUS: STATUS_CODE.SUCCESSFUL_RESPONSE.OK
  },
  OBJECT_RECEIVED: {
    MESSAGE: 'Object received successfully',
    STATUS: STATUS_CODE.SUCCESSFUL_RESPONSE.OK
  },
  CREATED: {
    MESSAGE: 'Item created successfully',
    STATUS: STATUS_CODE.SUCCESSFUL_RESPONSE.CREATED
  },
  UPDATED: {
    MESSAGE: 'Item updated successfully',
    STATUS: STATUS_CODE.SUCCESSFUL_RESPONSE.OK
  },
  DELETED: {
    MESSAGE: 'Item removed successfully',
    STATUS: STATUS_CODE.SUCCESSFUL_RESPONSE.OK
  },
  GET: {
    MESSAGE: 'Item found successfully',
    STATUS: STATUS_CODE.SUCCESSFUL_RESPONSE.OK
  }
}

export { ERRORS, SUCCESS }
