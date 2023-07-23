// Models
import { Chats } from '../models/chat.model.js'

// DAOs
import { DAO_CHATS } from '../dao/chat.database.js'

class ChatService {
  async createChat ({ user, message }) {
    const newChat = new Chats({ user, message })
    const response = await DAO_CHATS.createChat(newChat.DTO())
    return response
  }

  async getAllChats () {
    const response = await DAO_CHATS.getChats()
    return response
  }
}

const chatService = new ChatService()

export { chatService }
