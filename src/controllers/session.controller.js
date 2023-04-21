/* eslint-disable space-before-function-paren */

function login(req, res, next) {
  const userInfo = {
    email: req.body.email,
    name: `${req.body.first_name} ${req.body.last_name}`,
    age: req.body.age
  }
  console.log(userInfo)

  if (req.session.user) {
    return res.json({ rta: 'Usuario ya logeado' }) // podria hacer directamente el redirect
  }
  // if (username !== 'eze' || password !== 'admin') res.send('login failed')

  req.session.user = userInfo.email
  req.session.admin = true
  res.json({ rta: 'login success' })
}

function logout(req, res, next) {
  req.session.destroy(err => {
    if (!err) res.send('logout ok!')
    else res.send({ status: 'Logout Error', body: err })
  })
}

export { login, logout }
