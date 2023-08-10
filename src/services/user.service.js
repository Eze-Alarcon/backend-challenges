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

  async getMany (query = {}, options = { password: 0, cartID: 0, age: 0 }, sort = false) {
    const users = await this.#daoUsers.findUser(query, options, sort)
    return { users }
  }

  async getOne ({ email }) {
    const data = await this.#daoUsers.findUser({ email })
    const user = data.length > 0 ? data[0] : []
    return {
      user,
      userExist: data.length > 0
    }
  }

  async createOne (userInfo) {
    const { error } = userValidation({ data: userInfo })
    if (error !== undefined) CustomError.userError(error)

    const { userExist } = await this.getOne({ email: userInfo.email })
    if (userExist) throw new CustomError(AUTH_ERROR.HAS_ACCOUNT)

    const newPassword = await hashPassword(userInfo.password)

    let cartID = null
    if (userInfo.role !== ROLES.ADMIN) {
      const { cart } = await cartService.createOne({ email: userInfo.email })
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

  async updateOne (query, fields) {
    await this.#daoUsers.updateOne(query, fields)
  }

  async deleteMany () {
    const minutes = 30
    const inactiveTime = new Date().getTime() - (minutes * 60 * 1000) // Restamos 30 minutos al tiempo actual
    const { users } = await this.getMany({ last_connection: { $lt: inactiveTime } }, { email: 1, first_name: 1 })
    if (users.lenght === 0) return
    users.forEach(async (user) => {
      await emailService.send({ dest: user.email, message: user.first_name, emailType: 'delete' })
    })
    await this.#daoUsers.deleteInactiveUsers()
  }

  async deleteOne (query) {
    await this.#daoUsers.deleteOne(query)
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

  async passwordRecovery ({ email }) {
    const { userExist } = await this.getOne({ email })
    if (!userExist) throw new CustomError(AUTH_ERROR.NO_ACCOUNT)
    const link = generateRecoveryLink({ email })
    await emailService.send({ dest: email, message: link, emailType: 'recovery' })
  }

  async updatePassword ({ email, password }) {
    password.length <= 3 && CustomError.userError('Password is too short')
    const oldUser = await this.#daoUsers.findUser({ email }, { password: 1 })
    const samePassword = await comparePassword({ password, hashPassword: oldUser.at(0).password })
    samePassword && CustomError.userError('New password cannot be the same as the old one')
    const newPassword = await hashPassword(password)
    await this.updateOne({ email }, { password: newPassword })
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

    const { cart } = await cartService.createOne({ email })

    const newUser = new UserGithub({ email, cartID: cart.id })

    await this.#daoGH.createOne(newUser.getUserGithub())

    return {
      status: STATUS_CODE.SUCCESS.CREATED,
      user: newUser.getUserGithub()
    }
  }
}

const userService = new UserService({ DAO_USERS, DAO_GH: DAO_GITHUB_USERS })

export { userService }
