// Error Messages
import { CustomError } from '../models/error.model.js'
import { SERVER_ERROR } from '../utils/errors.messages.js'

export function handleError (error, req, res, next) {
  req.logger.info('\n=========\n[errorHandler.js] Error log\n=========\n')

  if (error instanceof CustomError) {
    const errorData = error.DTO()
    return res
      .status(errorData.status)
      .json({ type: errorData.type, cause: errorData.cause })
  }

  const newError = new CustomError({
    TYPE: 'Server Error',
    CAUSE: SERVER_ERROR.SERVER_ERROR.MESSAGE,
    STATUS: SERVER_ERROR.SERVER_ERROR.STATUS
  })

  const newErrorDTO = newError.DTO()

  req.logger.error(newErrorDTO)
  return res.status(newErrorDTO.status).json({ type: newErrorDTO.type, cause: newErrorDTO.cause })
}
