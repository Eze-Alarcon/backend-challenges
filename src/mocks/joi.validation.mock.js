import { validation } from '../schemas/joi/users.joi.schema.js'
import { CustomError } from '../models/error.model.js'

const data = [{
  email: 'test@test.com',
  role: 'use'
}]

const { error, value } = validation({ data })

if (error !== undefined) {
  const x = new CustomError({
    cause: error,
    type: 'User Error',
    status: 400
  })
  console.log(x.DTO())
}

console.log({ value })
