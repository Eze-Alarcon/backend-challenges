// Libraries
import jwt from 'jsonwebtoken'

// Config
import { SECRET_PASSWORD_JWT } from '../config/config.js'
import { ROUTES, SERVER_CONFIG } from '../config/server.config.js'

function generateToken (data) {
  const payload = JSON.parse(JSON.stringify(data))
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

function generateRecoveryLink ({ email }) {
  const URL = `${SERVER_CONFIG.BASE_URL}${ROUTES.SET_PASSWORD}`
  const date = new Date().getTime()
  const token = generateToken({ email, date })
  return URL.concat(token)
}

export {
  generateToken,
  verifyToken,
  generateRecoveryLink
}
