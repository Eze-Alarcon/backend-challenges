// Libraries
import express from 'express'

// Controller
import { getUsers, deleteInactiveUsers } from '../../controllers/user.cotroller.js'

export const userRouter = express.Router()

userRouter
  .route('/')
  .get(getUsers)
  .delete(deleteInactiveUsers)
