class CustomError extends Error {
  constructor ({ type, cause, status }) {
    super()
    this.type = type
    this.cause = cause
    this.status = status
  }
}

export { CustomError }