// Services
import { COOKIE_NAME } from '../config/config.js'
import { userService } from '../services/user.service.js'

// Utils
import { STATUS_CODE } from '../utils/errors.messages.js'
import { generateToken, verifyToken } from '../utils/jwt.config.js'

async function getUsers (req, res, next) {
  try {
    const users = await userService.getMany()
    res
      .status(STATUS_CODE.SUCCESS.OK)
      .json(users)
  } catch (error) {
    next(error)
  }
}

async function deleteInactiveUsers (req, res, next) {
  try {
    await userService.deleteMany()
    res
      .status(STATUS_CODE.SUCCESS.OK)
      .json({ completed: true })
  } catch (error) {
    next(error)
  }
}

async function updatePass (req, res, next) {
  try {
    await userService.updatePassword({ email: req.body.email, password: req.body.password })
    res
      .status(STATUS_CODE.SUCCESS.OK)
      .json({ message: 'Password updated succesfully' })
  } catch (error) {
    next(error)
  }
}

async function updateRole (req, res, next) {
  try {
    const token = req.signedCookies[COOKIE_NAME]
    const user = await verifyToken(token)
    const newRole = user.role === 'user' ? 'premium' : 'user'
    await userService.updateOne({ email: req.body.email }, { role: newRole })

    const now = new Date()
    const minutes = 60 // Tiempo de expiración de la cookie en minutos
    now.setTime(now.getTime() + minutes * 60 * 1000)

    delete user.iat
    delete user.exp
    res
      .cookie(COOKIE_NAME, generateToken({ ...user, role: newRole }), {
        signed: true,
        httpOnly: true,
        expires: now
      })
      .status(STATUS_CODE.SUCCESS.OK)
      .json({ message: 'Role updated succesfully' })
  } catch (error) {
    next(error)
  }
}

async function updateUser (req, res, next) {
  try {
    const newRole = req.body.role === 'user' ? 'premium' : 'user'
    await userService.updateOne({ email: req.body.email }, { role: newRole })
    res
      .status(STATUS_CODE.SUCCESS.OK)
      .json({ message: 'Role updated succesfully' })
  } catch (error) {
    next(error)
  }
}

async function deleteUser (req, res, next) {
  try {
    await userService.deleteOne({ email: req.body.email })
    res
      .status(STATUS_CODE.SUCCESS.OK)
      .json({ message: 'User deleted succesfully' })
  } catch (error) {
    next(error)
  }
}

export {
  getUsers,
  deleteInactiveUsers,
  updatePass,
  updateRole,
  updateUser,
  deleteUser
}
