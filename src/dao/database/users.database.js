/* eslint-disable space-before-function-paren */

import { usuarioModel } from '../models/users.schema.js'

class DB_USER_MANAGER {
  #model
  constructor(model) {
    this.#model = model
  }

  async findUser(query) {
    const user = await this.#model.find(query, { _id: 0 }).lean()

    return [...user]
  }

  async createUser(user) {
    await this.#model.create(user)
  }
}

const DB_USERS = new DB_USER_MANAGER(usuarioModel)

export { DB_USERS }
