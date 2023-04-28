/* eslint-disable camelcase */
/* eslint-disable space-before-function-paren */

import { User } from '../../classes/user.class.js'
import { AUTH_ERROR, STATUS_CODE } from '../../helpers/errors.messages.js'
import { comparePassword, hashPassword } from '../../helpers/hash.js'
import { DB_USERS } from '../database/users.database.js'

class UserManager {
  async #searchUser({ email }) {
    const data = await DB_USERS.findUser({ email })
    const user = data.length > 0 ? data[0] : []

    return {
      user,
      userExist: data.length > 0
    }
  }

  async logUser({ email, password }) {
    const { user, userExist } = await this.#searchUser({ email })
    if (!userExist) throw new Error(AUTH_ERROR.NO_ACCOUNT.ERROR_CODE)

    const samePassword = await comparePassword({ password, hashPassword: user.password })
    if (!samePassword) throw new Error(AUTH_ERROR.WRONG_CREDENTIALS.ERROR_CODE)

    return {
      user,
      status: STATUS_CODE.SUCCESS.OK
    }
  }

  async createUser({
    email,
    password,
    first_name,
    last_name,
    age
  }) {
    const { userExist } = await this.#searchUser({ email })

    if (userExist) throw new Error(AUTH_ERROR.NO_ACCOUNT.ERROR_CODE)

    const newPassword = await hashPassword(password)

    const newUser = new User({
      email,
      password: newPassword,
      first_name,
      last_name,
      age
    })

    await DB_USERS.createUser(newUser.getData())

    return {
      status: STATUS_CODE.SUCCESS.CREATED,
      user: newUser.getPublicData()
    }
  }
}

const userManager = new UserManager()

export { userManager }
