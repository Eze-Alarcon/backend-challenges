// Models
import { ROLES, UserGithub, UserPassport } from '../models/user.model.js'
import { CustomError } from '../models/error.model.js'

// DAOs
import { DAO_USERS, DAO_GITHUB_USERS } from '../dao/users.database.js'

// Services
import { cartService } from './cart.service.js'
import { emailService } from './email.service.js'

// Utils
import { AUTH_ERROR, STATUS_CODE } from '../utils/errors.messages.js'
import { comparePassword, hashPassword } from '../utils/hash.js'
import { generateRecoveryLink } from '../utils/jwt.config.js'

// Joi
import { validation as userValidation } from '../schemas/joi/users.joi.schema.js'

class UserService {
  #daoUsers
  #daoGH
  constructor ({ DAO_USERS, DAO_GH }) {
    this.#daoUsers = DAO_USERS
    this.#daoGH = DAO_GH
  }

  async getMany () {
    const users = await this.#daoUsers.findUser({}, { password: 0, cartID: 0, age: 0 })
    return { users }
  }

  async deleteMany () {
    await this.#daoUsers.deleteInactiveUsers()
  }

  async getOne ({ email }) {
    const data = await this.#daoUsers.findUser({ email })
    const user = data.length > 0 ? data[0] : []

    return {
      user,
      userExist: data.length > 0
    }
  }

  async logUser ({ email, password }) {
    const { user, userExist } = await this.getOne({ email })
    if (!userExist) throw new CustomError(AUTH_ERROR.HAS_ACCOUNT)

    const samePassword = await comparePassword({ password, hashPassword: user.password })
    if (!samePassword) throw new CustomError(AUTH_ERROR.WRONG_CREDENTIALS)

    const currentTime = new Date().getTime()
    this.#daoUsers.updateOne({ email }, { last_connection: currentTime })

    return {
      user,
      status: STATUS_CODE.SUCCESS.OK
    }
  }

  async createOne (userInfo) {
    const { error } = userValidation({ data: userInfo })
    if (error !== undefined) CustomError.userError(error)

    const { userExist } = await this.getOne({ email: userInfo.email })
    if (userExist) throw new CustomError(AUTH_ERROR.HAS_ACCOUNT)

    const newPassword = await hashPassword(userInfo.password)

    let cartID = null
    if (userInfo.role === ROLES.USER) {
      const { cart } = await cartService.createOne()
      cartID = cart.id
    }

    const newUser = new UserPassport({
      ...userInfo,
      password: newPassword,
      cartID
    })

    await this.#daoUsers.createOne(newUser.getUser())

    return {
      status: STATUS_CODE.SUCCESS.CREATED,
      user: newUser.getPublicData()
    }
  }

  async getOneGithubUser ({ email }) {
    const data = await this.#daoGH.findUser({ email })
    const user = data.length > 0 ? data[0] : []

    return {
      user,
      userExist: data.length > 0
    }
  }

  async createGithubUser ({ email }) {
    const { userExist } = await this.getOne({ email })
    if (userExist) throw new CustomError(AUTH_ERROR.HAS_ACCOUNT)

    const { cart } = await cartService.createOne()

    const newUser = new UserGithub({ email, cartID: cart.id })

    await this.#daoGH.createOne(newUser.getUserGithub())

    return {
      status: STATUS_CODE.SUCCESS.CREATED,
      user: newUser.getUserGithub()
    }
  }

  async passwordRecovery ({ email }) {
    const { userExist } = await this.getOne({ email })
    if (!userExist) throw new CustomError(AUTH_ERROR.NO_ACCOUNT)
    const link = generateRecoveryLink({ email })
    await emailService.send({ dest: email, message: link })
  }

  async updateOne (query, fields) {
    await this.#daoUsers.updateOne(query, fields)
  }

  async updatePassword ({ email, password }) {
    password.length <= 3 && CustomError.userError('Password is too short')
    const oldUser = await this.#daoUsers.findUser({ email }, { password: 1 })
    const samePassword = await comparePassword({ password, hashPassword: oldUser.at(0).password })
    console.log(samePassword)
    samePassword && CustomError.userError('New password cannot be the same as the old one')
    const newPassword = await hashPassword(password)
    await this.updateOne({ email }, { password: newPassword })
  }
}

const userService = new UserService({ DAO_USERS, DAO_GH: DAO_GITHUB_USERS })

export { userService }
