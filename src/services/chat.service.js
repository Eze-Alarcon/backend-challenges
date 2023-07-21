// Models
import { Chats } from '../models/chat.model.js'

// DAOs
import { DB_CHATS } from '../dao/chat.database.js'

class ChatManager {
  async createChat ({ user, message }) {
    const newChat = new Chats({ user, message })
    const response = await DB_CHATS.createChat(newChat.DTO())
    return response
  }

  async getAllChats () {
    const response = await DB_CHATS.getChats()
    return response
  }
}

const chatManager = new ChatManager()

export { chatManager }
