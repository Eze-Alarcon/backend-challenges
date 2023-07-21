// Libraries
import mongoose, { Schema } from 'mongoose'

const ticketSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  code: { type: String, required: true },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
  purchase_datetime: { type: String, required: true }
}, { versionKey: false })

const ticketModel = mongoose.model('ticket', ticketSchema)

export { ticketModel }
