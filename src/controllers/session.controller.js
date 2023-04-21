/* eslint-disable camelcase */
/* eslint-disable space-before-function-paren */

import { UM as usersManager } from '../dao/managers/user.manager.js'

// deberia mandarlo a otro lado aunque no se donde
const ADMINS = [
  {
    email: 'eze@eze',
    password: 'abc',
    admin: true
  },
  {
    email: 'adminCoder@coder.com',
    password: 'adminCod3r123',
    admin: true
  }
]

function isAdmin({ email, password }) {
  return ADMINS.some((el) => el.email === email && el.password === password)
}

async function login(req, res) {
  const { email, password } = req.body
  const { user, userExist } = await usersManager.logUser({ email, password })

  const role = isAdmin({ email, password })

  if (userExist) {
    req.session.user = user.email
    req.session.name = `${user.first_name} ${user.last_name}`
    req.session.age = user.age
    req.session.admin = role
    return res.json({ message: 'login success', isLog: true })
  }

  res.json({ message: 'login failed', isLog: false })
}

async function register(req, res) {
  const { email, password, age, first_name, last_name } = req.body

  await usersManager.createUser({ email, password, age, first_name, last_name })

  const role = isAdmin({ email, password })

  req.session.user = email
  req.session.name = `${first_name} ${last_name}`
  req.session.age = age
  req.session.admin = role
  res.json({ message: 'login success', isLog: true })
}

function logout(req, res) {
  req.session.destroy(err => {
    if (!err) res.send('logout ok!')
    else res.send({ status: 'Logout Error', body: err })
  })
}

export { login, register, logout }
