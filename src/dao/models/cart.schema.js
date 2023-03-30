import { Schema } from 'mongoose'

const cartSchema = new Schema({
  productRef: { type: String, required: true },
  quantity: { type: Number, required: true }
})

export { cartSchema }
