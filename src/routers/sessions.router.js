import express, { Router } from 'express'
import {
  getCurrentUser,
  loginReponse,
  logout,
  registerResponse,
  saveJwtCookie
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
  .post(alreadyHasSession, autenticacionUserRegister, saveJwtCookie, registerResponse)

sessionRouter
  .route('/logout')
  .delete(hasSession, logout)

sessionRouter
  .route('/github')
  .get(autenticacionUserGithub)

sessionRouter
  .route('/githubcallback')
  .get(antenticacionUserGithub_CB, (req, res, next) => { res.redirect('/') })

sessionRouter
  .route('/current')
  .get(hasSession, getCurrentUser)
