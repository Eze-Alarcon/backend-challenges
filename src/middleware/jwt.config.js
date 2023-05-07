import jwt from 'jsonwebtoken'

import { secretPasswordJwt } from '../config/login.config.js'

function generateToken (user) {
  const payload = JSON.parse(JSON.stringify(user))

  const token = jwt.sign(payload, secretPasswordJwt, { expiresIn: '1h' })

  return token
}

function verifyToken (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretPasswordJwt, (err, decodedPayload) => {
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
