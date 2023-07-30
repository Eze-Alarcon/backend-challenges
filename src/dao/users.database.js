// Schemas
import { userModel, githubUserModel } from '../schemas/mongoose/users.schema.js'

class DB_USER_MANAGER {
  #model
  constructor (model) {
    this.#model = model
  }

  #toPOJO (item) {
    return JSON.parse(JSON.stringify(item))
  }

  async findUser (query, options) {
    const response = await this.#model.find(query, { _id: 0, ...options })
    const user = this.#toPOJO(response)
    return [...user]
  }

  async createUser (user) {
    await this.#model.create(user)
  }

  async updateLastConnection (email) {
    const currentTime = new Date().getTime()
    await this.#model.updateOne({ email }, { last_connection: currentTime })
  }

  async deleteInactiveUsers () {
    const minutes = 30
    const inactiveTime = new Date().getTime() - (minutes * 60 * 1000) // Restamos 30 minutos al tiempo actual
    await this.#model.deleteMany({ last_connection: { $lt: inactiveTime } })
  }
}

// ===== Local DB Manager =====
const DAO_USERS = new DB_USER_MANAGER(userModel)

// ===== Github DB Manager =====
const DAO_GITHUB_USERS = new DB_USER_MANAGER(githubUserModel)

export { DAO_USERS, DAO_GITHUB_USERS }
