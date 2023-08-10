// Libraries
import jwt from 'jsonwebtoken'

// Config
import { SECRET_PASSWORD_JWT } from '../config/config.js'

function generateToken (data) {
  const payload = JSON.parse(JSON.stringify(data))

  const token = jwt.sign(payload, SECRET_PASSWORD_JWT, { expiresIn: '1h' })

  return token
}

const tok = generateToken({ test: 'ansidsa' })

console.log(tok)
