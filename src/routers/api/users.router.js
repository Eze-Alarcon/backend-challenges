import express, { Router } from 'express'
import { alreadyHasSession } from '../../middleware/session'

export const usersRouter = Router()

usersRouter.use(express.json())

usersRouter
  .route('/')
  .get(alreadyHasSession) // crear metodo para buscar el usuario actual segun el email y guardar la info en el front
