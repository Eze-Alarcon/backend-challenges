class CustomError extends Error {
  constructor ({ type, cause, status }) {
    super()
    this.type = type
    this.cause = cause
    this.status = status
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
}

export { CustomError }
