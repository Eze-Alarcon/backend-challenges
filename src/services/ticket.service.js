// Services
import { cartManager } from './cart.service.js'

// Models
import { Ticket } from '../models/tickets.model.js'

class TicketManager {
  async createTicket ({ cartID, email }) {
    const { cart, productsAvailables } = await cartManager.checkCart({ cartID })

    console.log(productsAvailables)
    const finalPrice = productsAvailables.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    console.log('finalPrice: ', finalPrice)

    const newTicket = Ticket({
      amount: finalPrice,
      purchaser: email
    })
    console.log('==========')
    console.log('cart', cart)
    console.log('==========')
    console.log('newTicket:', newTicket)
    console.log('==========')
    console.log('productsAvailables', productsAvailables)
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

// uso el ticket.database.js
