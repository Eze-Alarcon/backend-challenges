// Libraries
import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  products: {
    type: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
        quantity: { type: Number }
      }
    ],
    default: []
  }
}, { versionKey: false })

cartSchema.add({ id: mongoose.Types.ObjectId })

cartSchema.pre('save', function (next) {
  if (!this.id) {
    this.id = JSON.parse(JSON.stringify(this._id))
  }
  next()
})

const cartModel = mongoose.model('carts', cartSchema)

export { cartModel }
