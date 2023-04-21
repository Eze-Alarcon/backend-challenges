/* eslint-disable space-before-function-paren */

import { UM as usersManager } from '../dao/managers/user.manager.js'

async function login(req, res) {
  const searchedUser = await usersManager.logUser({
    email: req.body.email,
    password: req.body.password
  })

  if (searchedUser.userExist) {
    req.session.user = searchedUser.user.email
    req.session.admin = req.session.admin ?? false
    return res.json({ message: 'login success', isLog: true })
  }

  res.json({ message: 'login failed', isLog: false })
}

async function register(req, res) {
  await usersManager.createUser(req.body)

  // if (username !== 'eze' || password !== 'admin') res.send('login failed')

  // a futuro, guardar esto en un session manager
  req.session.user = req.body.email
  req.session.name = `${req.body.first_name} ${req.body.last_name}`
  req.session.age = req.body.age
  req.session.admin = false
  res.json({ message: 'login success', isLog: true })
}

function logout(req, res) {
  req.session.destroy(err => {
    if (!err) res.send('logout ok!')
    else res.send({ status: 'Logout Error', body: err })
  })
}

export { login, register, logout }
