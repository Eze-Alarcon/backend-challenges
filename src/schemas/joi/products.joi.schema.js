import Joi from 'joi'

const productSchema = Joi.object({
  title: Joi.string()
    .required()
    .min(1),

  description: Joi.string()
    .required()
    .min(1),

  price: Joi.number()
    .required()
    .positive()
    .min(0),

  stock: Joi.number()
    .required()
    // .positive()
    .min(0),

  thumbnail: Joi.array()
    .min(0)
})

function validation ({ data }) {
  const { error, value } = productSchema.validate(data)

  if (error !== undefined) {
    return { error: error.details.at(0).message, value }
  }
  return { error: undefined, value }
}

export { validation }
