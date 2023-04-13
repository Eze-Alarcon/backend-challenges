'use strict'
/* eslint space-before-function-paren: 0 */
import { ERRORS } from '../helpers/errors.messages.js'

export function handleError(error, req, res, next) {
  try {
    const { STATUS, MESSAGE } = ERRORS[error]

    return res.status(STATUS).json({ message: MESSAGE })
  } catch (err) {
    const { STATUS, MESSAGE } = ERRORS.SERVER_ERROR
    console.log('log de error en el erros.js', err)
    return res.status(STATUS).json({ message: MESSAGE })
  }
}
