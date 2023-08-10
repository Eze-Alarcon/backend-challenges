// Libraries
import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema({
  code: { type: String, required: true },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
  purchase_datetime: { type: String, required: true }
}, { versionKey: false })

ticketSchema.add({ id: mongoose.Types.ObjectId })

ticketSchema.pre('save', function (next) {
  if (!this.id) {
    this.id = JSON.parse(JSON.stringify(this._id))
  }
  next()
})

const ticketModel = mongoose.model('ticket', ticketSchema)

export { ticketModel }
