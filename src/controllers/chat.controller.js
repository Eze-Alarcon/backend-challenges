// Socket server
import { io } from '../app.js'

// Services
import { chatService } from '../services/chat.service.js'

async function getAllMessages () {
  const messages = await chatService.getAllChats()
  io.emit('getData', { messages })
}

async function newMessage ({ message, user }) {
  const response = await chatService.createChat({ message, user })
  io.emit('message', { user: response.user, message: response.message })
}

export { getAllMessages, newMessage }
