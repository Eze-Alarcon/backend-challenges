// Libraries
import mongoose, { Schema } from 'mongoose'

const chatSchema = new Schema({
  id: { type: String, required: true, unique: true },
  user: { type: String },
  message: { type: String },
  date: { type: String }
}, { versionKey: false })

const chatModel = mongoose.model('chats', chatSchema)

export { chatModel }
