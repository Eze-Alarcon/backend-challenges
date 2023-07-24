// Services
import { cartService } from './cart.service.js'
import { productService } from './product.service.js'

// Models
import { Ticket } from '../models/tickets.model.js'
import { CustomError } from '../models/error.model.js'

// Utils
import { STATUS_CODE, TICKET_MANAGER_ERRORS } from '../utils/errors.messages.js'
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
      const { cart } = await cartService.getCartById(cartID)

      for (const item of cart.products) {
        const { item: storeProduct } = await productService.getProductById({ id: item.product.id })
        if (item.quantity > storeProduct.stock) continue
        subtotal += item.quantity * item.product.price
        await productService.updateProduct({ id: item.product.id }, { stock: storeProduct.stock - item.quantity })
        await cartService.deleteCartProduct({ cartID: cart.id, productID: item.product.id })
      }

      if (subtotal === 0) {
        return {
          ticket: {},
          cart: {},
          status: STATUS_CODE.SUCCESS.NO_CONTENT
        }
      }

      const lastID = await this.#dao.getLastID()

      const ticketModel = new Ticket({
        id: lastID,
        amount: subtotal,
        purchaser: email
      })

      const newTicket = await this.#dao.createOne(ticketModel.DTO())
      const { cart: newCart } = await cartService.getCartById(cartID)

      return {
        ticket: newTicket,
        cart: newCart,
        status: STATUS_CODE.SUCCESS.CREATED
      }
    } catch (error) {
      logger.error(error)
      throw new CustomError(TICKET_MANAGER_ERRORS.CREATE_TICKET_ERROR)
    }
  }

  async getTicket ({ ticketID }) {
    try {
      const ticket = await this.#dao.getOne({ id: ticketID })
      return { ticket, status: STATUS_CODE.SUCCESS.OK }
    } catch (error) {
      logger.error(error)
      throw new CustomError(TICKET_MANAGER_ERRORS.TICKET_NOT_FOUND)
    }
  }

  async deleteTicket ({ ticketID }) {
    try {
      const deletedTicket = await this.#dao.deleteOne({ id: ticketID })
      return { deletedTicket, status: STATUS_CODE.SUCCESS.NO_CONTENT }
    } catch (error) {
      logger.error(error)
      throw new CustomError(TICKET_MANAGER_ERRORS.TICKET_NOT_FOUND)
    }
  }
}

const ticketService = new TicketService({ DAO: DAO_TICKET })

export { ticketService }
