'use strict'
import express, { Router } from 'express'
import {
  login,
  logout,
  register
} from '../controllers/session.controller.js'

export const sessionRouter = Router()

sessionRouter.use(express.json())

sessionRouter
  .route('/login')
  .post(login)

sessionRouter
  .route('/register')
  .post(register)

sessionRouter
  .route('/logout')
  .delete(logout)
