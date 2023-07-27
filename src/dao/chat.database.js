// Schemas
import { chatModel } from '../schemas/mongoose/chat.schema.js'

class DB_CHAT_MANAGER {
  #model
  constructor (model) {
    this.#model = model
  }

  #toPOJO (item) {
    return JSON.parse(JSON.stringify(item))
  }

  async getChats () {
    const response = await this.#model.find({}, { _id: 0 })
    const data = this.#toPOJO(response)
    return data
  }

  async createChat (item) {
    const response = await this.#model.create(item)
    const data = this.#toPOJO(response)
    return data
  }
}

const DAO_CHATS = new DB_CHAT_MANAGER(chatModel)

export { DAO_CHATS }
