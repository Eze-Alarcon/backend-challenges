'use strict'
/* eslint space-before-function-paren: 0 */
import { ERRORS } from '../helpers/errors.messages.js'

export function handleError(error, req, res, next) {
  try {
    console.log('log de error en el erros.js', error)

    const { STATUS, MESSAGE } = ERRORS[error]

    return res.status(STATUS).json({ message: MESSAGE })
  } catch (err) {
    const response = ERRORS.SERVER_ERROR
    return res.status(response.STATUS).json({ message: response.MESSAGE })
  }
}
