import Joi from 'joi'

// constans
import { ROLES } from '../../utils/contans.js'

const userSchema = Joi.object({
  email: Joi.string()
    .required()
    .email(),

  role: Joi.string()
    .valid(...Object.values(ROLES))
})

function validation ({ data }) {
  const { error, value } = userSchema.validate(data)

  if (error !== undefined) {
    if (error.details.at(0).type === 'any.only') {
      return { error: 'Invalid role', value }
    }
    return { error: error.details.at(0).message, value }
  }
  return { error: undefined, value }
}

export { validation }
