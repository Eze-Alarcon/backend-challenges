/* eslint-disable no-prototype-builtins */
// Schemas
import { ticketModel } from '../schemas/mongoose/ticket.schema.js'

class DB_TICKET_MANAGER {
  #model
  constructor (model) {
    this.#model = model
  }

  #toPOJO (item) {
    return JSON.parse(JSON.stringify(item))
  }

  async getOne (query) {
    const response = await this.#model.find(query)
    const data = this.#toPOJO(response)
    return data
  }

  async deleteOne (query) {
    const response = await this.#model.deleteOne(query)
    const data = this.#toPOJO(response)
    return data
  }

  async createOne (item) {
    const response = await this.#model.create(item)
    const data = this.#toPOJO(response)
    return data
  }
}

const DAO_TICKET = new DB_TICKET_MANAGER(ticketModel)

export { DAO_TICKET }
