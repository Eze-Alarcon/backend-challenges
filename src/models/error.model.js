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
}

export { CustomError }
