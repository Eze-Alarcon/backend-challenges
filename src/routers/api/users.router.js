// Libraries
import express from 'express'

// Controller
import {
  getUsers,
  deleteInactiveUsers,
  updatePass
} from '../../controllers/user.cotroller.js'

export const userRouter = express.Router()

userRouter
  .route('/password')
  .put(updatePass)

userRouter
  .route('/')
  .get(getUsers)
  .delete(deleteInactiveUsers)
