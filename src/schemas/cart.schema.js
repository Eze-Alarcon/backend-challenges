import mongoose, { Schema } from 'mongoose'

const cartSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  products: {
    type: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'products' },
        quantity: { type: Number }
      }
    ],
    default: []
  }
}, { versionKey: false })

const cartModel = mongoose.model('carts', cartSchema)

export { cartModel }
