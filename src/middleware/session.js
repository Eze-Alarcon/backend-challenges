/* eslint-disable space-before-function-paren */

function hasSession(req, res, next) {
  if (!req.session.user) return res.redirect('/')
  next()
}

function alreadyHasSession(req, res, next) {
  if (req.session.user) return res.redirect('/products')
  next()
}

// podria hacer una funcion hasAccess para verificar la autorizacion

export { hasSession, alreadyHasSession }
