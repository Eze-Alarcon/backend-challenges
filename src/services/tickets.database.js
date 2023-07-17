import mongoose from 'mongoose'
import { ticketModel } from '../schemas/ticket.schema.js'

// guiarse con algun otro archivo similar
// ejemplo: carts.database.js

class DB_TICKET_MANAGER {
  #model
  constructor (model) {
    this.#model = model
  }

  getTicket () {
    // TODO: pendiente de implementar
  }

  deleteTicket () {
    // TODO: pendiente de implementar
  }

  createTicket () {
    // TODO: pendiente de implementar
  }
}

const DB_TICKET = new DB_TICKET_MANAGER(ticketModel)

export { DB_TICKET }
