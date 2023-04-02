'use strict'

/* eslint space-before-function-paren: 0 */
import { SUCCESS } from '../../mocks/messages.js'
import { Message } from '../../mocks/Message.class.js'
import { MM_MONGO } from './database.manager.js'

class MessageManager {
  constructor() {
    this.messageList = []
  }

  async getMessages() {
    const messages = await MM_MONGO.getItems()
    this.messageList = messages
    return this.messageList
  }

  async getMessageById(query) {
    const message = await MM_MONGO.findMessageByUser(query)
    return {
      status_code: SUCCESS.GET.STATUS,
      item: message
    }
  }

  async addMessage(fields) {
    await this.getMessages()

    const newMessage = new Message({ user: fields.user, message: fields.message })
    this.messageList.push(newMessage.getMessage())

    await MM_MONGO.createMessage(newMessage.getMessage())

    return {
      status_code: SUCCESS.CREATED.STATUS,
      productAdded: newMessage
    }
  }

  async deleteProduct(messageID) {
    const itemDeleted = await MM_MONGO.deleteMessage(messageID)

    return {
      status_code: SUCCESS.DELETED.STATUS,
      itemDeleted
    }
  }
}

const MM = new MessageManager()

export { MM }
