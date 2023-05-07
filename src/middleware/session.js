import { verifyToken } from './jwt.config.js'

// req.signedCookies.jwt_authorization === false en el caso de que el usuario haya modificado la cookie

async function hasSession (req, res, next) {
  try {
    if (req.signedCookies.jwt_authorization === undefined || req.signedCookies.jwt_authorization === false) {
      return res.redirect('/')
    }

    const token = req.signedCookies.jwt_authorization

    await verifyToken(token)

    return next()
  } catch (err) {
    next(err)
  }
}

async function alreadyHasSession (req, res, next) {
  try {
    if (req.signedCookies.jwt_authorization !== undefined && req.signedCookies.jwt_authorization !== false) {
      const token = req.signedCookies.jwt_authorization

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
