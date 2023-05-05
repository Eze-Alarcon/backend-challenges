import { userModel, githubUserModel } from '../schemas/users.schema.js'

// ===== Local DB Manager =====

class DB_USER_MANAGER {
  #model
  constructor (model) {
    this.#model = model
  }

  async findUser (query) {
    const user = await this.#model.find(query, { _id: 0 }).lean()

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

  async findUser (query) {
    const user = await this.#model.find(query, { _id: 0 }).lean()

    return [...user]
  }

  async createUser (user) {
    await this.#model.create(user)
  }
}

const DB_USERS = new DB_USER_MANAGER(userModel)
const DB_GITHUB_USERS = new DB_USER_GITHUB_MANAGER(githubUserModel)

export { DB_USERS, DB_GITHUB_USERS }
