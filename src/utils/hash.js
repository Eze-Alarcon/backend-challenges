// Libraries
import bcrypt from 'bcrypt'

// Config
import { SALT } from '../config/config.js'

async function hashPassword (password) {
  return bcrypt.hashSync(password, SALT)
}

async function comparePassword ({ password, hashPassword }) {
  return bcrypt.compare(password, hashPassword)
}

export { hashPassword, comparePassword }
