// Socket server
import { io } from '../app.js'

// Services
import { chatManager } from '../services/chat.service.js'

async function getAllMessages () {
  const messages = await chatManager.getAllChats()
  io.emit('getData', { messages })
}

async function newMessage ({ message, user }) {
  const response = await chatManager.createChat({ message, user })
  io.emit('message', { user: response.user, message: response.message })
}

export { getAllMessages, newMessage }
