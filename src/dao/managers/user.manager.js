/* eslint-disable camelcase */
/* eslint-disable space-before-function-paren */

import { User } from '../../classes/user.class.js'
import { DB_USERS } from '../database/users.database.js'

class UsersManager {
  async #searchUser({ email, password }) {
    const data = await DB_USERS.findUser({ email, password })
    const user = data.length > 0 ? data[0] : []

    return {
      user,
      userExist: data.length > 0
    }
  }

  async logUser({ email, password }) {
    const user = await this.#searchUser({ email, password })

    return user
  }

  async createUser({
    email,
    password,
    first_name,
    last_name,
    age
  }) {
    const searchedUser = await this.#searchUser({ email, password })

    if (searchedUser.userExist) {
      console.log('el usuario ya existe') // TODO: dar una respuesta valida
      console.log('user: ', searchedUser)
      return
    }

    const newUser = new User({
      email,
      password,
      first_name,
      last_name,
      age
    })

    const userCreated = await DB_USERS.createUser(newUser.getData())

    console.log('userCreated', userCreated) // TODO: Responder o borrar la rta del user.database
  }
}

const UM = new UsersManager()

export { UM }
