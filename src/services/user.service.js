// Models
import { ROLES, UserGithub, UserPassport } from '../models/user.model.js'

// DAOs
import { DB_USERS, DB_GITHUB_USERS } from '../dao/users.database.js'

// Services
import { cartService } from './cart.service.js'

// Utils
import { AUTH_ERROR, STATUS_CODE } from '../utils/errors.messages.js'
import { comparePassword, hashPassword } from '../utils/hash.js'

class UserService {
  async searchUser ({ email }) {
    const data = await DB_USERS.findUser({ email })
    const user = data.length > 0 ? data[0] : []

    return {
      user,
      userExist: data.length > 0
    }
  }

  async logUser ({ email, password }) {
    const { user, userExist } = await this.searchUser({ email })
    if (!userExist) throw new Error(AUTH_ERROR.HAS_ACCOUNT.ERROR_CODE)

    const samePassword = await comparePassword({ password, hashPassword: user.password })
    if (!samePassword) throw new Error(AUTH_ERROR.WRONG_CREDENTIALS.ERROR_CODE)

    return {
      user,
      status: STATUS_CODE.SUCCESS.OK
    }
  }

  async createUser ({
    email,
    password,
    first_name,
    last_name,
    age,
    role
  }) {
    const { userExist } = await this.searchUser({ email })

    if (userExist) throw new Error(AUTH_ERROR.HAS_ACCOUNT.ERROR_CODE)

    const newPassword = await hashPassword(password)

    let cartID = null
    if (role === ROLES.USER) {
      const { cart } = await cartService.createCart()
      cartID = cart.id
    }

    const newUser = new UserPassport({
      email,
      cartID,
      password: newPassword,
      first_name,
      last_name,
      age,
      role
    })

    await DB_USERS.createUser(newUser.getUser())

    return {
      status: STATUS_CODE.SUCCESS.CREATED,
      user: newUser.getPublicData()
    }
  }

  async searchGithubUser ({ email }) {
    const data = await DB_GITHUB_USERS.findUser({ email })
    const user = data.length > 0 ? data[0] : []

    return {
      user,
      userExist: data.length > 0
    }
  }

  async createGithubUser ({ email }) {
    const { userExist } = await this.searchUser({ email })

    if (userExist) throw new Error(AUTH_ERROR.HAS_ACCOUNT.ERROR_CODE)

    const { cart } = await cartService.createCart()

    const newUser = new UserGithub({ email, cartID: cart.id })

    await DB_GITHUB_USERS.createUser(newUser.getUserGithub())

    return {
      status: STATUS_CODE.SUCCESS.CREATED,
      user: newUser.getUserGithub()
    }
  }
}

const userService = new UserService()

export { userService }
