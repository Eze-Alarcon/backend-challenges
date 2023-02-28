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
  FIELD_EXIST: '[ERROR 400]: There is a product with the same',
  NOT_FOUND: '[ERROR 404]: Product not found'
}

const SUCCESS = {
  FIELDS: '[STATUS 200]: Fields ok',
  FIELD: '[STATUS 200]: Field ok',
  OBJECT_RECEIVED: '[STATUS 200]: Object received ok',
  CREATED: '[STATUS 201]: Item created successfully',
  UPDATED: '[STATUS 200]: Item updated successfully',
  DELETED: '[STATUS 200]: Item removed successfully',
  GET: '[STATUS 200]: Item found successfully'
}

export { ERRORS, SUCCESS }
