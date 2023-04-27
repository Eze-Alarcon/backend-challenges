'use strict'
/* eslint space-before-function-paren: 0 */
import { SERVER_ERROR, AUTH_ERROR, CART_MANAGER_ERRORS, CREATE_PRODUCT_ERRORS, PRODUCT_MANAGER_ERRORS } from '../helpers/errors.messages.js'

function searchError(errorCode) {
  const ERRORS = {
    ...AUTH_ERROR,
    ...CART_MANAGER_ERRORS,
    ...CREATE_PRODUCT_ERRORS,
    ...PRODUCT_MANAGER_ERRORS,
    ...SERVER_ERROR
  }

  return {
    status: ERRORS[errorCode].STATUS,
    message: ERRORS[errorCode].MESSAGE
  }
}

export function handleError(err, req, res, next) {
  try {
    const { message, status } = searchError(err)

    return res.status(status).json({ message })
  } catch (err) {
    const { STATUS, MESSAGE } = SERVER_ERROR.SERVER_ERROR
    return res.status(STATUS).json({ message: MESSAGE })
  }
}
