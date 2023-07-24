// Models
import { ROLES, UserGithub, UserPassport } from '../models/user.model.js'
import { CustomError } from '../models/error.model.js'

// DAOs
import { DAO_USERS, DAO_GITHUB_USERS } from '../dao/users.database.js'

// Services
import { cartService } from './cart.service.js'

// Utils
import { AUTH_ERROR, STATUS_CODE } from '../utils/errors.messages.js'
import { comparePassword, hashPassword } from '../utils/hash.js'

// Joi
import { validation as userValidation } from '../schemas/joi/users.joi.schema.js'

class UserService {
  async searchUser ({ email }) {
    const data = await DAO_USERS.findUser({ email })
    const user = data.length > 0 ? data[0] : []

    return {
      user,
      userExist: data.length > 0
    }
  }

  async logUser ({ email, password }) {
    const { user, userExist } = await this.searchUser({ email })
    if (!userExist) throw new CustomError(AUTH_ERROR.HAS_ACCOUNT)

    const samePassword = await comparePassword({ password, hashPassword: user.password })
    if (!samePassword) throw new CustomError(AUTH_ERROR.WRONG_CREDENTIALS)

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
    const { error } = userValidation({
      email,
      password,
      first_name,
      last_name,
      age,
      role
    })
    if (error !== undefined) CustomError.userError(error)

    const { userExist } = await this.searchUser({ email })
    if (userExist) throw new CustomError(AUTH_ERROR.HAS_ACCOUNT)

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

    await DAO_USERS.createUser(newUser.getUser())

    return {
      status: STATUS_CODE.SUCCESS.CREATED,
      user: newUser.getPublicData()
    }
  }

  async searchGithubUser ({ email }) {
    const data = await DAO_GITHUB_USERS.findUser({ email })
    const user = data.length > 0 ? data[0] : []

    return {
      user,
      userExist: data.length > 0
    }
  }

  async createGithubUser ({ email }) {
    const { userExist } = await this.searchUser({ email })
    if (userExist) throw new CustomError(AUTH_ERROR.HAS_ACCOUNT)

    const { cart } = await cartService.createCart()

    const newUser = new UserGithub({ email, cartID: cart.id })

    await DAO_GITHUB_USERS.createUser(newUser.getUserGithub())

    return {
      status: STATUS_CODE.SUCCESS.CREATED,
      user: newUser.getUserGithub()
    }
  }
}

const userService = new UserService()

export { userService }
