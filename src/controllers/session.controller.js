// Middlewares
import { generateToken, verifyToken } from '../middleware/jwt.config.js'

// Config
import { COOKIE_NAME } from '../config/config.js'

// Contans
import { ROLES } from '../utils/contans.js'
import { AUTH_ERROR } from '../utils/errors.messages.js'

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
  const now = new Date()
  const minutes = 60 // Tiempo de expiración de la cookie en minutos
  now.setTime(now.getTime() + minutes * 60 * 1000)

  res.cookie(COOKIE_NAME, generateToken(req.user), {
    signed: true,
    httpOnly: true,
    expires: now
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

async function isAdmin (req, res, next) {
  try {
    const token = req.signedCookies[COOKIE_NAME]

    const { role } = await verifyToken(token)

    if (role !== ROLES.ADMIN) throw new Error(AUTH_ERROR.FORBIDDEN.ERROR_CODE)
    next()
  } catch (error) {
    next(error)
  }
}

export {
  logout,
  loginReponse,
  registerResponse,
  saveJwtCookie,
  getCurrentUser,
  isAdmin
}
