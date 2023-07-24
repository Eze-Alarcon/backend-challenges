import { USER_ERROR } from '../utils/errors.messages.js'

class CustomError extends Error {
  constructor (error) {
    super()
    this.type = error.TYPE
    this.cause = error.CAUSE
    this.status = error.STATUS
  }

  DTO () {
    return {
      type: this.type,
      cause: this.cause,
      status: this.status,
      message: super.message,
      stack: super.stack
    }
  }

  static userError (CAUSE) {
    const err = new CustomError({
      TYPE: USER_ERROR.TYPE,
      STATUS: USER_ERROR.STATUS,
      CAUSE
    })
    throw err.DTO()
  }
}

export { CustomError }
