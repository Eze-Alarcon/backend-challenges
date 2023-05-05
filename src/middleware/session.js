function hasSession (req, res, next) {
  if (!req.session.passport) return res.redirect('/')

  next()
}

function alreadyHasSession (req, res, next) {
  if (req.session.passport) return res.redirect('/products')

  next()
}

// podria hacer una funcion hasAccess para verificar la autorizacion

export { hasSession, alreadyHasSession }
