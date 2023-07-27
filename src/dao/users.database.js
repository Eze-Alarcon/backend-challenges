// Schemas
import { userModel, githubUserModel } from '../schemas/mongoose/users.schema.js'

// ===== Local DB Manager =====

class DB_USER_MANAGER {
  #model
  constructor (model) {
    this.#model = model
  }

  #toPOJO (item) {
    return JSON.parse(JSON.stringify(item))
  }

  async findUser (query) {
    const response = await this.#model.find(query, { _id: 0 })
    const user = this.#toPOJO(response)
    return [...user]
  }

  async createUser (user) {
    await this.#model.create(user)
  }
}

// ===== Github DB Manager =====

class DB_USER_GITHUB_MANAGER {
  #model
  constructor (model) {
    this.#model = model
  }

  #toPOJO (item) {
    return JSON.parse(JSON.stringify(item))
  }

  async findUser (query) {
    const response = await this.#model.find(query, { _id: 0 })
    const user = this.#toPOJO(response)
    return [...user]
  }

  async createUser (user) {
    await this.#model.create(user)
  }
}

const DAO_USERS = new DB_USER_MANAGER(userModel)
const DAO_GITHUB_USERS = new DB_USER_GITHUB_MANAGER(githubUserModel)

export { DAO_USERS, DAO_GITHUB_USERS }
