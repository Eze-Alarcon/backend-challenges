'use strict'
import express, { Router } from 'express'
import {
  login,
  logout,
  register
} from '../controllers/session.controller.js'
import { alreadyHasSession, hasSession } from '../middleware/session.js'

export const sessionRouter = Router()

sessionRouter.use(express.json())

sessionRouter
  .route('/login')
  .post(alreadyHasSession, login)

sessionRouter
  .route('/register')
  .post(alreadyHasSession, register)

sessionRouter
  .route('/logout')
  .delete(hasSession, logout)
