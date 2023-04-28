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
  SUCCESS: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204
  },
  SERVER_ERROR: {
    INTERNAL_ERROR: 500,
    NOT_IMPLEMENTED: 501
  }
}

/* ========== Errores de productos ========== */

const CREATE_PRODUCT_ERRORS = {
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
  INCORRECT_FIELD_TYPE_STRING: {
    MESSAGE: "[ERROR]: The fields 'title, code, thumbnail and description' must be strings.",
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: "INCORRECT_FIELD_TYPE_STRING"
  },
  INCORRECT_FIELD_TYPE_NUMBER: {
    MESSAGE: "[ERROR]: The fields 'price, stock and quantity' must be numbers.",
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: "INCORRECT_FIELD_TYPE_NUMBER"
  },
  FIELD_STATUS: {
    MESSAGE: "[ERROR]: The field 'stock' must be a boolean.",
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: "FIELD_STATUS"
  },
  PRODUCT_EXIST: {
    MESSAGE: "[ERROR]: Product already exists in the database",
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    ERROR_CODE: "PRODUCT_EXIST"
  }
}

/* ========== Errores del server ========== */

const SERVER_ERROR = {
  SERVER_ERROR: {
    MESSAGE: "Something has happened, contact maintenance.",
    STATUS: STATUS_CODE.SERVER_ERROR.INTERNAL_ERROR,
    ERROR_CODE: "SERVER_ERROR"
  },
  FEATURE_NOT_IMPLEMENTED: {
    MESSAGE: "Feature not available at the moment, available in future releases.",
    STATUS: STATUS_CODE.SERVER_ERROR.NOT_IMPLEMENTED,
    ERROR_CODE: "FEATURE_NOT_IMPLEMENTED"
  }
}

/* ========== Errores de los managers ========== */

const PRODUCT_MANAGER_ERRORS = {
  PRODUCT_NOT_FOUND: {
    MESSAGE: "[ERROR]: Product not found",
    STATUS: STATUS_CODE.CLIENT_ERROR.NOT_FOUND,
    ERROR_CODE: "PRODUCT_NOT_FOUND"
  },
  NO_PRODUCTS_PARAMETERS: {
    MESSAGE: "[ERROR]: No products were found with these search query parameters",
    STATUS: STATUS_CODE.SUCCESS.OK,
    ERROR_CODE: "NO_PRODUCTS_PARAMETERS"
  },
  CREATE_PRODUCT: {
    MESSAGE: "Something went wrong with the 'addProduct' method",
    STATUS: STATUS_CODE.SERVER_ERROR.INTERNAL_ERROR,
    ERROR_CODE: "CREATE_PRODUCT"
  }
}

const CART_MANAGER_ERRORS = {
  GET_CARTS: {
    MESSAGE: "[ERROR]: Something went wrong with the 'getCarts' method",
    STATUS: STATUS_CODE.SERVER_ERROR.INTERNAL_ERROR,
    ERROR_CODE: "GET_CARTS"
  },
  CREATE_CARTS: {
    MESSAGE: "[ERROR]: Something went wrong with the 'createCart' method",
    STATUS: STATUS_CODE.SERVER_ERROR.INTERNAL_ERROR,
    ERROR_CODE: "CREATE_CARTS"
  },
  ADD_PRODUCT_TO_CART: {
    MESSAGE: "[ERROR]: Something went wrong with the 'addProductToCart' method",
    STATUS: STATUS_CODE.SERVER_ERROR.INTERNAL_ERROR,
    ERROR_CODE: "ADD_PRODUCT_TO_CART"
  },
  CART_NOT_FOUND: {
    MESSAGE: "[ERROR]: Cart not found",
    STATUS: STATUS_CODE.CLIENT_ERROR.NOT_FOUND,
    ERROR_CODE: "CART_NOT_FOUND"
  }
}

/* ========== Errores de autenticacion ========== */

const AUTH_ERROR = {
  NO_SESSION: {
    MESSAGE: "[ERROR]: Login to continue",
    STATUS: STATUS_CODE.CLIENT_ERROR.UNAUTHORIZED,
    ERROR_CODE: "NO_SESSION"
  },
  NO_ACCOUNT: {
    MESSAGE: "[ERROR]: Authentication error. If you already have an account, please try to log in or register",
    STATUS: STATUS_CODE.CLIENT_ERROR.UNAUTHORIZED,
    ERROR_CODE: "NO_ACCOUNT"
  },
  WRONG_CREDENTIALS: {
    MESSAGE: "[ERROR]: Authentication error. Invalid username and password",
    STATUS: STATUS_CODE.CLIENT_ERROR.UNAUTHORIZED,
    ERROR_CODE: "WRONG_CREDENTIALS"
  }
}

export {
  AUTH_ERROR,
  CART_MANAGER_ERRORS,
  CREATE_PRODUCT_ERRORS,
  PRODUCT_MANAGER_ERRORS,
  SERVER_ERROR,
  STATUS_CODE
}
