import { generateToken } from '../middleware/jwt.config.js'

async function loginReponse (req, res, next) {
  return res.json({ message: 'Login success', isLog: true })
}

async function registerResponse (req, res, next) {
  res.json({ message: 'login success', isLog: true })
}

function logout (req, res) {
  res.clearCookie('jwt_authorization', {
    signed: true,
    httpOnly: true
  })
  res.send({ status: 'Logout Error' })
}

function saveJwtCookie (req, res, next) {
  res.cookie('jwt_authorization', generateToken(req.user), {
    signed: true,
    httpOnly: true
  })
  next()
}

export {
  logout,
  loginReponse,
  registerResponse,
  saveJwtCookie
}
