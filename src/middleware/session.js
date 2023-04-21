/* eslint-disable space-before-function-paren */

function hasSession(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/')
    // podria enviarlo a una pagina que indique que no esta logeado
  }
  next()
}

function alreadyHasSession(req, res, next) {
  if (req.session.user) {
    return res.redirect('/products')
    // podria enviarlo a una pagina que indique que ya esta logeado
  }
  next()
}

// podria hacer una funcion hasAccess para verificar la autorizacion

export { hasSession, alreadyHasSession }
