/* eslint-disable camelcase */
/* eslint-disable space-before-function-paren */
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { userManager } from '../dao/managers/user.manager.js'

passport.use('register', new LocalStrategy(
  { passReqToCallback: true, usernameField: 'email' }, async (req, _u, _p, done) => {
    try {
      const { email, password, age, first_name, last_name } = req.body

      // const role = isAdmin({ email, password })
      const { user } = await userManager.createUser({ email, password, age, first_name, last_name })

      done(null, user)
    } catch (err) {
      done(err.message)
    }
  }
))

passport.use('local', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
  try {
    const { user } = await userManager.logUser({ email: username, password })

    done(null, user)
  } catch (err) {
    done(err.message)
  }
}))

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

// estos son para cargar en express como middlewares a nivel aplicacion
export const passportInitialize = passport.initialize()
export const passportSession = passport.session()

// estos son para cargar como middlewares antes de los controladores correspondientes
export const autenticacionUserRegister = passport.authenticate('register', { failWithError: true })
export const autenticacionUserLogin = passport.authenticate('local', { failWithError: true })
