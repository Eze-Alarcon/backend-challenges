'use strict'
/* eslint space-before-function-paren: 0 */
import { ERRORS } from '../helpers/errors.messages.js'

export function handleError(err, req, res, next) {
  try {
    const { STATUS, MESSAGE } = ERRORS[err]

    return res.status(STATUS).json({ message: MESSAGE })
  } catch (err) {
    const response = ERRORS.SERVER_ERROR
    return res.status(response.STATUS).json({ message: response.MESSAGE })
  }
}
