/* eslint-disable space-before-function-paren */

import { usuarioModel } from '../models/users.schema.js'

class DB_USER_MANAGER {
  #model
  constructor(model) {
    this.#model = model
  }

  async findUser(query) {
    const user = await this.#model.find(query).lean()

    return [...user]
  }

  async createUser(user) {
    try {
      await this.#model.create(user)
      return { userCreated: true } // TODO: Cambiar esto por algo mas sigificativo
    } catch (err) {
      // throw new Error(ERRORS.CREATE_PRODUCT.ERROR_CODE)
      // TODO: agregar nuevo mensaje de error
    }
  }
}

const DB_USERS = new DB_USER_MANAGER(usuarioModel)

export { DB_USERS }
