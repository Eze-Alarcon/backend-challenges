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

  async getLastID () {
    const response = await this.#model
      .find()
      .sort({ id: 'desc' })
      .limit(1)

    const data = this.#toPOJO(response)

    // Si no tiene la propiedad es porque no existe ningun carrito
    if (data.length === 0 || !data[0].hasOwnProperty('id')) { return 1 }

    return Number(data[0].id) + 1
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
