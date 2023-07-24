import { validation } from '../schemas/joi/users.joi.schema.js'
import { CustomError } from '../models/error.model.js'

const data = {
  email: 'test@text.com'
}

const { error, value } = validation({ data })

// console.log(error)

if (error !== undefined) {
  const x = new CustomError({
    CAUSE: error,
    TYPE: 'User Error',
    STATUS: 400
  })
  console.log(x.DTO())
}

!error && console.log(value)
