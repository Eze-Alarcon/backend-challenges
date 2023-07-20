// Libraries
import express, { Router } from 'express'

// Controller
import {
  getCurrentUser,
  loginReponse,
  logout,
  registerResponse,
  saveJwtCookie
} from '../../controllers/session.controller.js'

// Middlewares
import { alreadyHasSession, hasSession } from '../../middleware/autentication.js'
import {
  autenticacionUserLogin,
  autenticacionUserRegister,
  autenticacionUserGithub,
  antenticacionUserGithub_CB
} from '../../middleware/passport.config.js'

export const sessionRouter = Router()

sessionRouter.use(express.json())

sessionRouter
  .route('/login')
  .post(alreadyHasSession, autenticacionUserLogin, saveJwtCookie, loginReponse)

sessionRouter
  .route('/register')
  .post(alreadyHasSession, autenticacionUserRegister, saveJwtCookie, registerResponse)

sessionRouter
  .route('/logout')
  .delete(hasSession, logout)

sessionRouter
  .route('/github')
  .get(autenticacionUserGithub, saveJwtCookie)

sessionRouter
  .route('/githubcallback')
  .get(antenticacionUserGithub_CB, saveJwtCookie, (req, res, next) => { res.redirect('/') })

sessionRouter
  .route('/current')
  .get(hasSession, getCurrentUser)
