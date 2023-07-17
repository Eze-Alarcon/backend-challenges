// Middlewares
import { generateToken, verifyToken } from '../middleware/jwt.config.js'

import { COOKIE_NAME } from '../config/config.js'

async function loginReponse (req, res, next) {
  return res.json({ message: 'Login success', isLog: true })
}

async function registerResponse (req, res, next) {
  res.json({ message: 'login success', isLog: true })
}

function logout (req, res) {
  res.clearCookie(COOKIE_NAME, {
    signed: true,
    httpOnly: true
  })
  res.send({ status: 'Logout Error' })
}

function saveJwtCookie (req, res, next) {
  res.cookie(COOKIE_NAME, generateToken(req.user), {
    signed: true,
    httpOnly: true
  })
  next()
}

async function getCurrentUser (req, res, next) {
  const token = req.signedCookies[COOKIE_NAME]

  const user = await verifyToken(token)

  const userData = {
    email: user.email,
    cartID: user.cartID,
    role: user.role,
    first_name: user.first_name,
    last_name: user.last_name,
    age: user.age
  }

  res.json({ user: userData })
}

export {
  logout,
  loginReponse,
  registerResponse,
  saveJwtCookie,
  getCurrentUser
}
