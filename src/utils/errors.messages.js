const STATUS_CODE = {
  CLIENT_ERROR: {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409
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

/* ========== Errores del server ========== */

const SERVER_ERROR = {
  SERVER_ERROR: {
    CAUSE: 'Something fail, contact maintenance.',
    STATUS: STATUS_CODE.SERVER_ERROR.INTERNAL_ERROR,
    TYPE: 'Server Error'
  },
  FEATURE_NOT_IMPLEMENTED: {
    CAUSE: 'Feature not available at the moment, available in future releases.',
    STATUS: STATUS_CODE.SERVER_ERROR.NOT_IMPLEMENTED,
    TYPE: 'Feature not available'
  }
}

/* ========== Errores de los managers ========== */

const PRODUCT_MANAGER_ERRORS = {
  REQUIRED_OBJECT: {
    CAUSE: '[ERROR]: Expected object.',
    STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
    TYPE: 'Type error'
  },
  PRODUCT_EXIST: {
    CAUSE: '[ERROR]: Product already exists in the database',
    STATUS: STATUS_CODE.CLIENT_ERROR.CONFLICT,
    TYPE: 'Product not created'
  },
  PRODUCT_NOT_FOUND: {
    CAUSE: '[ERROR]: Product not found',
    STATUS: STATUS_CODE.CLIENT_ERROR.NOT_FOUND,
    TYPE: 'Product not found'
  }
}

const CART_MANAGER_ERRORS = {
  CREATE_CARTS: {
    CAUSE: '[ERROR]: Cart not created',
    STATUS: STATUS_CODE.SERVER_ERROR.INTERNAL_ERROR,
    TYPE: 'Server Error'
  },
  ADD_PRODUCT_TO_CART: {
    CAUSE: '[ERROR]: Product not added properly',
    STATUS: STATUS_CODE.SERVER_ERROR.INTERNAL_ERROR,
    TYPE: 'Server Error'
  },
  CART_NOT_FOUND: {
    CAUSE: '[ERROR]: Cart not found',
    STATUS: STATUS_CODE.CLIENT_ERROR.NOT_FOUND,
    TYPE: 'Cart not found'
  }
}

const TICKET_MANAGER_ERRORS = {
  CREATE_TICKET_ERROR: {
    CAUSE: '[ERROR]: Ticket not created',
    STATUS: STATUS_CODE.SERVER_ERROR.INTERNAL_ERROR,
    TYPE: 'Server Error'
  },
  TICKET_NOT_FOUND: {
    CAUSE: '[ERROR]: Ticket not found',
    STATUS: STATUS_CODE.CLIENT_ERROR.NOT_FOUND,
    TYPE: 'Ticket not found'
  }
}

/* ========== Errores de autenticacion ========== */

const AUTH_ERROR = {
  NO_SESSION: {
    CAUSE: '[ERROR]: Login to continue',
    STATUS: STATUS_CODE.CLIENT_ERROR.UNAUTHORIZED,
    TYPE: 'User not logged'
  },
  HAS_ACCOUNT: {
    CAUSE: '[ERROR]: Authentication error. If you already have an account, please try to log in or register with another email',
    STATUS: STATUS_CODE.CLIENT_ERROR.UNAUTHORIZED,
    TYPE: 'User has account'
  },
  WRONG_CREDENTIALS: {
    CAUSE: '[ERROR]: Authentication error.',
    STATUS: STATUS_CODE.CLIENT_ERROR.UNAUTHORIZED,
    TYPE: 'Invalid username and password'
  },
  FORBIDDEN: {
    CAUSE: '[ERROR]: Autorization error',
    STATUS: STATUS_CODE.CLIENT_ERROR.FORBIDDEN,
    TYPE: 'Wrong credentials'
  }
}

/* ========== Errores de Verificacion ========== */

const USER_ERROR = {
  STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
  TYPE: 'User Error'
}

export {
  AUTH_ERROR,
  CART_MANAGER_ERRORS,
  PRODUCT_MANAGER_ERRORS,
  TICKET_MANAGER_ERRORS,
  SERVER_ERROR,
  STATUS_CODE,
  USER_ERROR
}
