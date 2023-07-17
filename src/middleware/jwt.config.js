// Libraries
import jwt from 'jsonwebtoken'

// Config
import { SECRET_PASSWORD_JWT } from '../config/config.js'

function generateToken (user) {
  const payload = JSON.parse(JSON.stringify(user))

  const token = jwt.sign(payload, SECRET_PASSWORD_JWT, { expiresIn: '1h' })

  return token
}

function verifyToken (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_PASSWORD_JWT, (err, decodedPayload) => {
      if (err) {
        reject(err)
      } else {
        resolve(decodedPayload)
      }
    })
  })
}

export {
  generateToken,
  verifyToken
}
