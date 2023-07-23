// Services
import { cartService } from './cart.service.js'
import { productService } from './product.service.js'

// Models
import { Ticket } from '../models/tickets.model.js'

// Utils
import { STATUS_CODE, TICKET_MANAGER_ERRORS } from '../utils/errors.messages.js'

// DAO
import { DAO_TICKET } from '../dao/tickets.database.js'

class TicketService {
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

      const lastID = await DAO_TICKET.getLastID()

      const ticketModel = new Ticket({
        id: lastID,
        amount: subtotal,
        purchaser: email
      })

      const newTicket = await DAO_TICKET.createOne(ticketModel.DTO())
      const { cart: newCart } = await cartService.getCartById(cartID)

      return {
        ticket: newTicket,
        cart: newCart,
        status: STATUS_CODE.SUCCESS.CREATED
      }
    } catch (error) {
      console.log(error)
      throw new Error(TICKET_MANAGER_ERRORS.CREATE_TICKET_ERROR.ERROR_CODE)
    }
  }

  async getTicket ({ ticketID }) {
    try {
      const ticket = await DAO_TICKET.getOne({ id: ticketID })
      return { ticket, status: STATUS_CODE.SUCCESS.OK }
    } catch (error) {
      console.log(error)
      throw new Error(TICKET_MANAGER_ERRORS.TICKET_NOT_FOUND.ERROR_CODE)
    }
  }

  async deleteTicket ({ ticketID }) {
    try {
      const deletedTicket = await DAO_TICKET.deleteOne({ id: ticketID })
      return { deletedTicket, status: STATUS_CODE.SUCCESS.NO_CONTENT }
    } catch (error) {
      console.log(error)
      throw new Error(TICKET_MANAGER_ERRORS.TICKET_NOT_FOUND.ERROR_CODE)
    }
  }
}

const ticketService = new TicketService()

export { ticketService }

/*
  Acciones a implementar:

    - Crear Ticket (apoyarse con el ticket.class.js)

    - Borrar Tickets

    - Obtener Ticket (ver si es necesario*)

    * Digo ver si es necesario porque al crear el ticket simplemente le devolvemos el ticket creado al usuario y listo pero por si acaso no viene mal tener esa funcion
*/
