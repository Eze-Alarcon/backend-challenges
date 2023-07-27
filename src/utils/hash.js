// Libraries
import bcrypt from 'bcrypt'
import crypto from 'crypto'

// Config
import { SALT } from '../config/config.js'

async function hashPassword (password) {
  return bcrypt.hashSync(password, SALT)
}

async function comparePassword ({ password, hashPassword }) {
  return bcrypt.compare(password, hashPassword)
}

function generateID () {
  return `${crypto.randomUUID()}`
}

export {
  hashPassword,
  comparePassword,
  generateID
}
