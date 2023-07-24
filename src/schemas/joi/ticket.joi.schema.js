import Joi from 'joi'

const ticketSchema = Joi.object({
  amount: Joi.number()
    .required()
    .greater(0),

  purchaser: Joi.string()
    .required()
    .email()
})

function validation ({ data }) {
  const { error, value } = ticketSchema.validate(data)

  if (error !== undefined) {
    return { error: error.details.at(0).message, value }
  }
  return { error: undefined, value }
}

export { validation }
