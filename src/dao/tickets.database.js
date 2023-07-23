/* eslint-disable no-prototype-builtins */
// Schemas
import { ticketModel } from '../schemas/ticket.schema.js'

class DB_TICKET_MANAGER {
  #model
  constructor (model) {
    this.#model = model
  }

  #parseResponse (item) {
    return JSON.parse(JSON.stringify(item))
  }

  async getLastID () {
    const data = await this.#model
      .find()
      .sort({ id: 'desc' })
      .limit(1)
      .lean()

    // Si no tiene la propiedad es porque no existe ningun carrito
    if (data.length === 0 || !data[0].hasOwnProperty('id')) { return 1 }

    return Number(data[0].id) + 1
  }

  async getOne (query) {
    const response = await this.#model.find(query).lean()
    return response
  }

  async deleteOne (query) {
    const response = await this.#model.deleteOne(query)
    return response
  }

  async createOne (item) {
    const response = await this.#model.create(item)
    const data = this.#parseResponse(response)
    return data
  }
}

const DAO_TICKET = new DB_TICKET_MANAGER(ticketModel)

export { DAO_TICKET }
