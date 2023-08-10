// Models
import { Chats } from '../models/chat.model.js'

// DAOs
import { DAO_CHATS } from '../dao/chat.database.js'

class ChatService {
  #dao
  constructor ({ DAO }) {
    this.#dao = DAO
  }

  async createChat ({ user, message }) {
    const newChat = new Chats({ user, message })
    const response = await this.#dao.createChat(newChat.DTO())
    return response
  }

  async getAllChats () {
    const response = await this.#dao.getChats()
    return response
  }
}

const chatService = new ChatService({ DAO: DAO_CHATS })

export { chatService }
