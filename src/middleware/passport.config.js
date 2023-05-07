import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GithubStrategy } from 'passport-github2'
import { userManager } from '../dao/user.manager.js'
import { clientID, clientSecret, githubCallbackUrl } from '../config/login.config.js'

passport.use('register', new LocalStrategy(
  { passReqToCallback: true, usernameField: 'email' },
  async (req, _u, _p, done) => {
    try {
      const { email, password, age, first_name, last_name, role } = req.body

      const { user } = await userManager.createUser({ email, password, age, first_name, last_name, role })
      done(null, user)
    } catch (err) {
      done(err.message)
    }
  }
))

passport.use('local', new LocalStrategy(
  { usernameField: 'email' },
  async (username, password, done) => {
    try {
      const { user } = await userManager.logUser({ email: username, password })

      done(null, user)
    } catch (err) {
      done(err.message)
    }
  }))

passport.use('github', new GithubStrategy({
  clientID,
  clientSecret,
  callbackURL: githubCallbackUrl
}, async (accessToken, refreshToken, profile, done) => {
  // console.log('profile', profile)
  let user
  try {
    const search = await userManager.searchGithubUser({ email: profile.username })
    user = search.user
  } catch (error) {
    const newUser = await userManager.createGithubUser({ email: profile.username })
    user = newUser.user
  }
  done(null, user)
}))

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

// estos son para cargar en express como middlewares a nivel aplicacion
export const passportInitialize = passport.initialize()
export const passportSession = passport.session()

// estos son para cargar como middlewares antes de los controladores correspondientes
export const autenticacionUserRegister = passport.authenticate('register', { failWithError: true })
export const autenticacionUserLogin = passport.authenticate('local', { failWithError: true })
export const autenticacionUserGithub = passport.authenticate('github', { scope: ['user:email'] })
export const antenticacionUserGithub_CB = passport.authenticate('github', { failWithError: true })
