import bcrypt from 'bcrypt'
import { salt } from '../config/login.config.js'

async function hashPassword (password) {
  return bcrypt.hashSync(password, salt)
}

async function comparePassword ({ password, hashPassword }) {
  return bcrypt.compare(password, hashPassword)
}

export { hashPassword, comparePassword }
