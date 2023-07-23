class CustomError extends Error {
  constructor ({ type, cause, status }) {
    super()
    this.type = type
    this.cause = cause
    this.status = status
  }
}

const bla = new CustomError({ type: 'User Error', cause: 'test de class CustomError', status: 404 })

console.log(bla instanceof CustomError)

console.log(bla)
