"use strict"

/* eslint space-before-function-paren: 0 */
/* eslint quotes: ["error", "double"] */

const STATUS_CODE = {
  CLIENT_ERROR: {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
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

const PRODUCTS_ERRORS = {
  REQUIRED_OBJECT: {
    MESSAGE: "[ERROR]: Expected object.",
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: "REQUIRED_OBJECT"
  },
  REQUIRED_FIELDS: {
    MESSAGE: "[ERROR]: Expected object with properties: title, description, thumbnail, price and stock",
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: "REQUIRED_FIELDS"
  },
  UPDATE_MORE_FIELDS: {
    MESSAGE: "[ERROR]: Expected object with one or more properties to change (title, description, thumbnail, price, stock)",
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: "UPDATE_MORE_FIELDS"
  },
  EMPTY_DESCRIPTION: {
    MESSAGE: "[ERROR]: The field 'description' is missing, null or undefined.",
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: "EMPTY_DESCRIPTION"
  },
  EMPTY_THUMBNAIL: {
    MESSAGE: "[ERROR]: The field 'thumbnail' is missing, null or undefined.",
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: "EMPTY_THUMBNAIL"
  },
  EMPTY_TITLE: {
    MESSAGE: "[ERROR]: The field 'title' is missing, null or undefined.",
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: "EMPTY_TITLE"
  },
  EMPTY_PRICE: {
    MESSAGE: "[ERROR]: The field 'price' is missing, null or undefined.",
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: "EMPTY_PRICE"
  },
  FIELD_DESCRIPTION: {
    MESSAGE: "[ERROR]: The field 'description' must be a string.",
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: "FIELD_DESCRIPTION"
  },
  FIELD_THUMBNAIL: {
    MESSAGE: "[ERROR]: The field 'thumbnail' must be a string.",
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: "FIELD_THUMBNAIL"
  },
  FIELD_TITLE: {
    MESSAGE: "[ERROR]: The field 'title' must be a string.",
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: "FIELD_TITLE"
  },
  FIELD_PRICE: {
    MESSAGE: "[ERROR]: The field 'price' must be a number.",
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: "FIELD_PRICE"
  },
  FIELD_STOCK: {
    MESSAGE: "[ERROR]: The field 'stock' must be a number.",
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: "FIELD_STOCK"
  },
  FIELD_QUANTITY: {
    MESSAGE: "[ERROR]: The field 'quantity' must be a number.",
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: "FIELD_QUANTITY"
  },
  FIELD_STATUS: {
    MESSAGE: "[ERROR]: The field 'stock' must be a boolean.",
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: "FIELD_STATUS"
  },
  FIELD_CODE_EXIST: {
    MESSAGE: "[ERROR]: The field 'code' must be a string.",
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: "FIELD_CODE_EXIST"
  },
  FIELD_EXIST: {
    MESSAGE: "[ERROR]: There is a product with the same ID",
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: "FIELD_EXIST"
  },
  PRODUCT_NOT_FOUND: {
    MESSAGE: "[ERROR]: Product not found",
    STATUS: STATUS_CODE.CLIENT_ERROR.NOT_FOUND,
    ERROR_CODE: "PRODUCT_NOT_FOUND"
  },
  NO_PRODUCTS_PARAMETERS: {
    MESSAGE: "[ERROR]: No products were found with these search query parameters",
    STATUS: STATUS_CODE.SUCCESSFUL_RESPONSE.OK,
    ERROR_CODE: "NO_PRODUCTS_PARAMETERS"
  },
  QUERY_NOT_NUMBER: {
    MESSAGE: "[ERROR]: Limit and page must be a number",
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: "QUERY_NOT_NUMBER"
  },
  QUERY_ID: {
    MESSAGE: "[ERROR]: Searched id must be a number",
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: "QUERY_ID"
  }
}

const PRODUCTS_SUCCESS = {
  FIELDS: {
    MESSAGE: "Fields ok",
    STATUS: STATUS_CODE.SUCCESSFUL_RESPONSE.OK
  },
  FIELD: {
    MESSAGE: "Field ok",
    STATUS: STATUS_CODE.SUCCESSFUL_RESPONSE.OK
  },
  OBJECT_RECEIVED: {
    MESSAGE: "Object received successfully",
    STATUS: STATUS_CODE.SUCCESSFUL_RESPONSE.OK
  },
  CREATED: {
    MESSAGE: "Item created successfully",
    STATUS: STATUS_CODE.SUCCESSFUL_RESPONSE.CREATED
  },
  UPDATED: {
    MESSAGE: "Item updated successfully",
    STATUS: STATUS_CODE.SUCCESSFUL_RESPONSE.OK
  },
  DELETED: {
    MESSAGE: "Item removed successfully",
    STATUS: STATUS_CODE.SUCCESSFUL_RESPONSE.OK
  },
  GET: {
    MESSAGE: "Item found successfully",
    STATUS: STATUS_CODE.SUCCESSFUL_RESPONSE.OK
  }
}

const CARTS_ERROR = {
  CART_NOT_FOUND: {
    MESSAGE: "[ERROR]: Cart not found",
    STATUS: STATUS_CODE.CLIENT_ERROR.NOT_FOUND,
    ERROR_CODE: "CART_NOT_FOUND"
  }
}

const CARTS_SUCCESS = {
  GET_CART: {
    MESSAGE: "Cart found successfully",
    STATUS: STATUS_CODE.SUCCESSFUL_RESPONSE.OK
  },
  CART_CREATED: {
    MESSAGE: "Cart created successfully",
    STATUS: STATUS_CODE.SUCCESSFUL_RESPONSE.CREATED
  },
  CART_PRODUCT: {
    MESSAGE: "Product added to cart successfully",
    STATUS: STATUS_CODE.SUCCESSFUL_RESPONSE.CREATED
  }
}

const SERVER_ERROR = {
  FEATURE_NOT_IMPLEMENTED: {
    MESSAGE: "Feature not available at the moment, available in future releases.",
    STATUS: STATUS_CODE.SERVER_ERROR.NOT_IMPLEMENTED,
    ERROR_CODE: "FEATURE_NOT_IMPLEMENTED"
  },
  SERVER_ERROR: {
    MESSAGE: "Something has happened, contact maintenance.",
    STATUS: STATUS_CODE.SERVER_ERROR.INTERNAL_ERROR,
    ERROR_CODE: "SERVER_ERROR"
  }
}

const PRODUCT_MANAGER_ERRORS = {
  CREATE_PRODUCT: {
    MESSAGE: "Something went wrong with the 'createProduct' method",
    STATUS: STATUS_CODE.SERVER_ERROR.INTERNAL_ERROR,
    ERROR_CODE: "CREATE_PRODUCT"
  }
}

const CART_MANAGER_ERRORS = {
  GET_CARTS: {
    MESSAGE: "Something went wrong with the 'getCarts' method",
    STATUS: STATUS_CODE.SERVER_ERROR.INTERNAL_ERROR,
    ERROR_CODE: "GET_CARTS"
  },
  CREATE_CARTS: {
    MESSAGE: "Something went wrong with the 'createCart' method",
    STATUS: STATUS_CODE.SERVER_ERROR.INTERNAL_ERROR,
    ERROR_CODE: "CREATE_CARTS"
  },
  ADD_PRODUCT_TO_CART: {
    MESSAGE: "Something went wrong with the 'addProductToCart' method",
    STATUS: STATUS_CODE.SERVER_ERROR.INTERNAL_ERROR,
    ERROR_CODE: "ADD_PRODUCT_TO_CART"
  }

}

const AUTH_ERROR = {
  NO_SESSION: {
    MESSAGE: "Login to continue",
    STATUS: STATUS_CODE.CLIENT_ERROR.UNAUTHORIZED,
    ERROR_CODE: "NO_SESSION"
  }
}

const ERRORS = {
  ...PRODUCTS_ERRORS,
  ...CARTS_ERROR,
  ...SERVER_ERROR,
  ...CART_MANAGER_ERRORS,
  ...PRODUCT_MANAGER_ERRORS
}

const SUCCESS = {
  ...PRODUCTS_SUCCESS,
  ...CARTS_SUCCESS
}

export { ERRORS, SUCCESS, AUTH_ERROR }
