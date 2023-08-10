import crypto from 'crypto'

class Chats {
  #id
  #user
  #message
  #date

  constructor ({
    user,
    message
  }) {
    this.#id = crypto.randomUUID()
    this.#date = new Intl.DateTimeFormat('en', { dateStyle: 'full', timeStyle: 'long' }).format()
    this.#user = user
    this.#message = message
  }

  DTO () {
    return {
      id: this.#id,
      user: this.#user,
      message: this.#message,
      date: this.#date
    }
  }
}

export { Chats }
