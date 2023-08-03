// Middlewares
import { generateToken, verifyToken } from '../utils/jwt.config.js'

// Config
import { COOKIE_NAME } from '../config/config.js'

// Services
import { userService } from '../services/user.service.js'

// Utils
import { ROLES } from '../utils/contans.js'
import { AUTH_ERROR } from '../utils/errors.messages.js'

async function loginReponse (req, res, next) {
  return res.json({ message: 'Login success', isLog: true })
}

async function registerResponse (req, res, next) {
  res.json({ message: 'Register success', isLog: true })
}

async function logout (req, res, next) {
  const token = req.signedCookies[COOKIE_NAME]
  const { email } = await verifyToken(token)
  await userService.updateOne({ email }, { last_connection: new Date().getTime() })
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
    age: user.age,
    last_connection: user.last_connection
  }
  res.json({ user: userData })
}

async function isAuthorized (req, res, next) {
  try {
    const token = req.signedCookies[COOKIE_NAME]
    const { role, email } = await verifyToken(token)
    if (role === ROLES.USER) throw new Error(AUTH_ERROR.FORBIDDEN.ERROR_CODE)
    role === ROLES.PREMIUM
      ? res.locals.owner = email
      : res.locals.owner = 'admin'
    next()
  } catch (error) {
    next(error)
  }
}

async function passwordRecovery (req, res, next) {
  try {
    await userService.passwordRecovery({ email: req.body.email })
    res.json({ message: 'Email sent, please check your inbox' })
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
  isAuthorized,
  passwordRecovery
}
