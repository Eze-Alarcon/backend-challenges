// Error Messages
import { CustomError } from '../models/error.model.js'
import { SERVER_ERROR } from '../utils/errors.messages.js'

export function handleError (error, req, res, next) {
  console.log('\n=========\n[errorHandler.js] Error log\n=========\n')

  if (!(error instanceof CustomError)) {
    const unknowError = new CustomError({
      type: 'Server Error',
      cause: SERVER_ERROR.SERVER_ERROR.MESSAGE,
      status: SERVER_ERROR.SERVER_ERROR.STATUS
    })
    console.log(unknowError)
    return res.status(unknowError.status).json({ type: unknowError.type, cause: unknowError.cause })
  }

  console.log(error)
  return res.status(error.status).json({ type: error.type, cause: error.cause })
}
