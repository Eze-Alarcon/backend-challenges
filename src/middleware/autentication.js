// Configs
import { COOKIE_NAME } from '../config/config.js'
import { verifyToken } from './jwt.config.js'

// Tips
// req.signedCookies[COOKIE_NAME] === false en el caso de que el usuario haya modificado la cookie

async function hasSession (req, res, next) {
  try {
    if (req.signedCookies[COOKIE_NAME] === undefined || req.signedCookies[COOKIE_NAME] === false) {
      return res.redirect('/')
    }

    const token = req.signedCookies[COOKIE_NAME]

    await verifyToken(token)

    return next()
  } catch (err) {
    next(err)
  }
}

async function alreadyHasSession (req, res, next) {
  try {
    if (req.signedCookies[COOKIE_NAME] !== undefined && req.signedCookies[COOKIE_NAME] !== false) {
      const token = req.signedCookies[COOKIE_NAME]

      await verifyToken(token)
      return res.redirect('/products')
    }
    return next()
  } catch (err) {
    next(err)
  }
}

// podria hacer una funcion hasAccess para verificar la autorizacion

export { hasSession, alreadyHasSession }
