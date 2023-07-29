// Services
import { cartService } from './cart.service.js'
import { productService } from './product.service.js'

// Models
import { Ticket } from '../models/tickets.model.js'
import { CustomError } from '../models/error.model.js'

// Utils
import { TICKET_MANAGER_ERRORS } from '../utils/errors.messages.js'
import { winstonLogger as logger } from '../utils/logger.js'

// DAO
import { DAO_TICKET } from '../dao/tickets.database.js'

class TicketService {
  #dao
  constructor ({ DAO }) {
    this.#dao = DAO
  }

  async createTicket ({ cartID, email }) {
    let subtotal = 0
    try {
      const { cart } = await cartService.getOne({ id: cartID })

      for (const item of cart.products) {
        const { product } = await productService.getOne({ id: item.product.id })
        if (item.quantity > product.stock) continue
        subtotal += item.quantity * item.product.price
        await productService.updateOne({ id: item.product.id }, { stock: product.stock - item.quantity })
        await cartService.deleteOneCartProduct({ cartID: cart.id, productID: item.product.id })
      }

      if (subtotal === 0) { throw new Error('empty_ticket') }

      const ticketModel = new Ticket({
        amount: subtotal,
        purchaser: email
      })

      const newTicket = await this.#dao.createOne(ticketModel.DTO())
      const { cart: newCart } = await cartService.getOne({ id: cartID })

      return {
        ticket: newTicket,
        cart: newCart
      }
    } catch (error) {
      logger.error(error)
      if (error.message === 'empty_ticket') {
        throw new CustomError(TICKET_MANAGER_ERRORS.EMPTY_TICKET_ERROR)
      }
      throw new CustomError(TICKET_MANAGER_ERRORS.CREATE_TICKET_ERROR)
    }
  }

  async getTicket ({ ticketID }) {
    try {
      const ticket = await this.#dao.getOne({ id: ticketID })
      return { ticket }
    } catch (error) {
      logger.error(error)
      throw new CustomError(TICKET_MANAGER_ERRORS.TICKET_NOT_FOUND)
    }
  }

  async deleteTicket ({ ticketID }) {
    try {
      const deletedTicket = await this.#dao.deleteOne({ id: ticketID })
      return { deleted_ticket: deletedTicket }
    } catch (error) {
      logger.error(error)
      throw new CustomError(TICKET_MANAGER_ERRORS.TICKET_NOT_FOUND)
    }
  }
}

const ticketService = new TicketService({ DAO: DAO_TICKET })

export { ticketService }
