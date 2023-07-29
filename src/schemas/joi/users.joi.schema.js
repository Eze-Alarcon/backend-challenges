import Joi from 'joi'

// constans
import { ROLES } from '../../utils/contans.js'

const userSchema = Joi.object({
  email: Joi.string()
    .required()
    .email(),

  password: Joi.string()
    .min(2),

  role: Joi.string()
    .valid(...Object.values(ROLES))
    .error((errors) => new Error('Invalid role')),

  first_name: Joi.string()
    .regex(/^[a-z]+$/)
    .min(2)
    .error((errors) => new Error('First name can only contain letters')),

  last_name: Joi.string()
    .regex(/^[a-z]+$/)
    .min(2)
    .error((errors) => new Error('Last name can only contain letters')),

  age: Joi.number()
    .min(0)
})

function validation ({ data }) {
  const { error, value } = userSchema.validate(data)

  if (error !== undefined) {
    if (error.details) return { error: error.details.at(0).message, value }
    return { error: error.message, value }
  }
  return { error: undefined, value }
}

export { validation }
