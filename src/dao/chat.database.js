// Schemas
import { chatModel } from '../schemas/chat.schema.js'

class DB_CHAT_MANAGER {
  #model
  constructor (model) {
    this.#model = model
  }

  #parseResponse (item) {
    return JSON.parse(JSON.stringify(item))
  }

  async getChats () {
    const response = await this.#model.find({}, { _id: 0 }).lean()
    return response
  }

  async createChat (item) {
    const response = await this.#model.create(item)
    const data = this.#parseResponse(response)
    return data
  }
}

const DB_CHATS = new DB_CHAT_MANAGER(chatModel)

export { DB_CHATS }
