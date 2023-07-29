// Libraries
import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  age: { type: Number, required: true },
  cartID: { type: String },
  role: { type: String, required: true }
}, { versionKey: false })

const githubUserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    cartID: { type: String, required: true },
    role: { type: String, required: true },
    first_name: { type: String },
    last_name: { type: String },
    age: { type: Number }
  },
  { versionKey: false }
)

const userModel = mongoose.model('users', usuarioSchema)
const githubUserModel = mongoose.model('usersGithub', githubUserSchema)

export { userModel, githubUserModel }
