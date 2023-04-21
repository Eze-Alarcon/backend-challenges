'use strict'
import express, { Router } from 'express'
import {
  login,
  logout
} from '../controllers/session.controller.js'

export const sessionRouter = Router()

sessionRouter.use(express.json())

sessionRouter
  .route('/')
  .post(login)
  .delete(logout)
