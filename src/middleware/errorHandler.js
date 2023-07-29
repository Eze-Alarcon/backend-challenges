// Error Messages
import { CustomError } from '../models/error.model.js'
import { SERVER_ERROR, AUTH_ERROR } from '../utils/errors.messages.js'

export function handleError (error, req, res, next) {
  req.logger.info('========= [errorHandler.js] Error log =========')

  if (error instanceof CustomError) {
    const errorData = error.DTO()
    return res
      .status(errorData.status)
      .json({ type: errorData.type, cause: errorData.cause })
  }

  if (error.message === 'Unauthorized') {
    const newError = new CustomError(AUTH_ERROR.WRONG_CREDENTIALS)

    const { cause, status, type } = newError.DTO()

    req.logger.error({ cause, status, type })
    return res.status(status).json({ type, cause })
  }

  const newError = new CustomError(SERVER_ERROR.SERVER_ERROR)
  const { cause, status, type } = newError.DTO()

  req.logger.error({ cause, status, type })
  return res.status(status).json({ type, cause })
}
