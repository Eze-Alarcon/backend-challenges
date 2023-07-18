// DAOs
import { cartManager } from '../services/cart.service.js'
import { ticketManager } from '../services/ticket.service.js'

/*
  * la idea de este controller es que sea un pasamanos, pasa la info a otros componentes y si otra cosa falla simplemente el controller pasa el error al middleware de error
*/

async function getTicket (req, res, next) {
  try {
    // usar el ticketManager
    // TODO: Pendiente de implementar
    // ! TODA VALIDACION NECESARIA SE HARA EN ticket.manager.js
  } catch (error) {
    next(error)
  }
}

async function createTicket (req, res, next) {
  try {
    const cartID = req.params.cid
    await cartManager.checkCart({ cartID })
    // llamo al servicio de tickets (ticketManager)
    // TODO: Pendiente de implementar
    // ! TODA VALIDACION NECESARIA SE HARA EN ticket.manager.js
    res.json('test 2')
  } catch (error) {
    next(error)
  }
}

async function deleteTicket (req, res, next) {
  try {
    // TODO: Pendiente de implementar
    // ! TODA VALIDACION NECESARIA SE HARA EN ticket.manager.js
  } catch (error) {
    next(error)
  }
}

export {
  getTicket,
  createTicket,
  deleteTicket
}
