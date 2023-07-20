// Error Messages
import * as ALL_ERRORS from '../utils/errors.messages.js'
const ERRORS = { ...ALL_ERRORS }

function searchError (errorCode) {
  return {
    status: ERRORS[errorCode].STATUS,
    message: ERRORS[errorCode].MESSAGE
  }
}

export function handleError (err, req, res, next) {
  try {
    console.log('[errors.js] Console log del error en hanleError')
    console.log(err)

    const { message, status } = searchError(err)

    return res.status(status).json({ message })
  } catch (err) {
    const { STATUS, MESSAGE } = ERRORS.SERVER_ERROR
    return res.status(STATUS).json({ message: MESSAGE })
  }
}
