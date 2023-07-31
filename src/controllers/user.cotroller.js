// Services
import { userService } from '../services/user.service.js'

// Utils
import { STATUS_CODE } from '../utils/errors.messages.js'

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
      .json({ completed: true })
  } catch (error) {
    next(error)
  }
}

export {
  getUsers,
  deleteInactiveUsers,
  updatePass
}
