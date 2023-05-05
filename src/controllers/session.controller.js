import { userManager } from '../dao/user.manager.js'

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

function isAdmin ({ email, password }) {
  return ADMINS.some((el) => el.email === email && el.password === password)
}

async function login (req, res, next) {
  try {
    const { email, password } = req.body
    const { user, status, userCanLog } = await userManager.logUser({ email, password })

    const role = isAdmin({ email, password })

    if (userCanLog) {
      req.session.user = user.email
      req.session.name = `${user.first_name} ${user.last_name}`
      req.session.age = user.age
      req.session.admin = role
      return res.status(status).json({ message: 'Login success', isLog: true })
    }

    res.status(status).json({ message: 'Login failed', isLog: false })
  } catch (error) {
    next(error.message)
  }
}

async function loginReponse (req, res, next) {
  return res.json({ message: 'Login success', isLog: true })
}

async function registerResponse (req, res, next) {
  res.json({ message: 'login success', isLog: true })
}

async function register (req, res, next) {
  try {
    const { email, password, age, first_name, last_name } = req.body

    const { status, user } = await userManager.createUser({ email, password, age, first_name, last_name })

    const role = isAdmin({ email, password })

    req.session.user = user.email
    req.session.name = user.name
    req.session.age = user.age
    req.session.admin = role

    res.status(status).json({ message: 'login success', isLog: true })
  } catch (error) {
    next(error.message)
  }
}

function logout (req, res) {
  req.session.destroy(err => {
    if (!err) res.send('logout ok!')
    else res.send({ status: 'Logout Error', body: err })
  })
}

export { login, register, logout, loginReponse, registerResponse }
