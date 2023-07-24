import { JOI_ERRORS } from '../utils/errors.messages.js'

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

  static joiError (CAUSE) {
    throw new CustomError({
      TYPE: JOI_ERRORS.TYPE,
      STATUS: JOI_ERRORS.STATUS,
      CAUSE
    })
  }
}

const test = CustomError.joiError('TEST')

console.log(test instanceof CustomError)
console.log(test.DTO())
