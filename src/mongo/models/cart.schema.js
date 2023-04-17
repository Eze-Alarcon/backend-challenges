import mongoose, { Schema } from 'mongoose'

const cartSchema = new Schema({
  id: { type: String, required: true, unique: true },
  products: {
    type: [
      {
        product: {
          id: {
            type: Schema.Types.ObjectId,
            ref: 'products'
          },
          quantity: { type: Number }
        }
      }
    ],
    default: []
  }
}, { versionKey: false })

const cartModel = mongoose.model('carts', cartSchema)

export { cartModel }
