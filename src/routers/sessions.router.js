import express, { Router } from 'express'
import {
  loginReponse,
  logout,
  registerResponse
} from '../controllers/session.controller.js'
import { alreadyHasSession, hasSession } from '../middleware/session.js'
import {
  autenticacionUserLogin,
  autenticacionUserRegister,
  autenticacionUserGithub,
  antenticacionUserGithub_CB
} from '../middleware/passport.config.js'

export const sessionRouter = Router()

sessionRouter.use(express.json())

sessionRouter
  .route('/login')
  .post(alreadyHasSession, autenticacionUserLogin, loginReponse)

sessionRouter
  .route('/register')
  .post(alreadyHasSession, autenticacionUserRegister, registerResponse)

sessionRouter
  .route('/logout')
  .delete(hasSession, logout)

sessionRouter
  .route('/github')
  .get(autenticacionUserGithub)

sessionRouter
  .route('/githubcallback')
  .get(antenticacionUserGithub_CB, (req, res, next) => { res.redirect('/') })
