// Libraries
import mongoose from 'mongoose'

// Schemas
import { ticketModel } from '../schemas/ticket.schema.js'

// guiarse con algun otro archivo similar
// ejemplo: carts.database.js

class DB_TICKET_MANAGER {
  #model
  constructor (model) {
    this.#model = model
  }

  getOne () {
    // TODO: logica de obtener el ticket
  }

  deleteOne (id) {

  }

  createOne () {
    // creo el objeto ticket

    // TODO: pendiente de implementar
  }
}

const DB_TICKET = new DB_TICKET_MANAGER(ticketModel)

export { DB_TICKET }