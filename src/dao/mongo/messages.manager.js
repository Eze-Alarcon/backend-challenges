'use strict'

/* eslint space-before-function-paren: 0 */
import { SUCCESS } from '../../mocks/messages.js'
import { Message } from '../../mocks/Message.class.js'
import { MM_MONGO } from './database.manager.js'

class MessageManager {
  async getMessages() {
    const messages = await MM_MONGO.getItems()
    return messages
  }

  async addMessage(fields) {
    const createMessage = new Message({ user: fields.user, message: fields.message })
    const newMessage = createMessage.getMessage()

    await MM_MONGO.createMessage(newMessage)

    return {
      status_code: SUCCESS.CREATED.STATUS,
      messageAdded: newMessage
    }
  }

  async deleteMessages() {
    const itemDeleted = await MM_MONGO.deleteMessage()

    return {
      status_code: SUCCESS.DELETED.STATUS,
      itemDeleted
    }
  }
}

const MM = new MessageManager()

export { MM }
