// Services
import { cartManager } from './cart.service.js'
import { productManager } from './product.service.js'

// Models
import { Ticket } from '../models/tickets.model.js'

// Utils
import { STATUS_CODE, TICKET_MANAGER_ERRORS } from '../utils/errors.messages.js'

// DAO
import { DB_TICKET } from '../dao/tickets.database.js'

class TicketManager {
  async createTicket ({ cartID, email }) {
    try {
      let subtotal = 0

      const { cart } = await cartManager.getCartById(cartID)

      for (const item of cart.products) {
        const { item: storeProduct } = await productManager.getProductById({ id: item.product.id })
        if (item.quantity > storeProduct.stock) continue
        subtotal += item.quantity * item.product.price
        await productManager.updateProduct({ id: item.product.id }, { stock: storeProduct.stock - item.quantity })
        await cartManager.deleteCartProduct({ cartID: cart.id, productID: item.product.id })
      }

      const lastID = await DB_TICKET.getLastID()

      const ticketModel = new Ticket({
        id: lastID,
        amount: subtotal,
        purchaser: email
      })

      const newTicket = await DB_TICKET.createOne(ticketModel.DTO())

      return {
        ticket: newTicket,
        cart,
        status: STATUS_CODE.SUCCESS.CREATED
      }
    } catch (error) {
      console.log(error)
      throw new Error(TICKET_MANAGER_ERRORS.CREATE_TICKET_ERROR.ERROR_CODE)
    }
  }

  async getTicket ({ ticketID }) {
    try {
      const ticket = await DB_TICKET.getOne({ id: ticketID })
      return { ticket, status: STATUS_CODE.SUCCESS.OK }
    } catch (error) {
      console.log(error)
      throw new Error(TICKET_MANAGER_ERRORS.TICKET_NOT_FOUND.ERROR_CODE)
    }
  }

  async deleteTicket ({ ticketID }) {
    try {
      const deletedTicket = await DB_TICKET.deleteOne({ id: ticketID })
      return { deletedTicket, status: STATUS_CODE.SUCCESS.NO_CONTENT }
    } catch (error) {
      console.log(error)
      throw new Error(TICKET_MANAGER_ERRORS.TICKET_NOT_FOUND.ERROR_CODE)
    }
  }
}

const ticketManager = new TicketManager()

export { ticketManager }

/*
  Acciones a implementar:

    - Crear Ticket (apoyarse con el ticket.class.js)

    - Borrar Tickets

    - Obtener Ticket (ver si es necesario*)

    * Digo ver si es necesario porque al crear el ticket simplemente le devolvemos el ticket creado al usuario y listo pero por si acaso no viene mal tener esa funcion
*/
