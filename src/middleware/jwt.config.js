import jwt from 'jsonwebtoken'

const SECRET_PASSWORD_JWT = 'secret'

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
  verifyToken,
  SECRET_PASSWORD_JWT
}
