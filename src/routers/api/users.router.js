// Libraries
import express from 'express'

// Controller
import {
  getUsers,
  deleteInactiveUsers,
  updatePass,
  updateRole,
  updateUser,
  deleteUser
} from '../../controllers/user.cotroller.js'

export const userRouter = express.Router()

userRouter
  .route('/premium')
  .put(updateRole)

userRouter
  .route('/user')
  .put(updateUser)
  .delete(deleteUser)

userRouter
  .route('/password')
  .put(updatePass)

userRouter
  .route('/')
  .get(getUsers)
  .delete(deleteInactiveUsers)
