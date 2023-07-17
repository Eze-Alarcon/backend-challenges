// DAOs
import { ticketManager } from '../dao/tickets.database.js'

/*
  * la idea de este controller es que sea un pasamanos, pasa la info a otros componentes y si otra cosa falla simplemente el controller pasa el error al middleware de error, para ello usar un try-catch y en el catch colocar next(error)
*/

async function getTicket (req, res, next) {
  try {
    // TODO: Pendiente de implementar
    // ! TODA VALIDACION NECESARIA SE HARA EN ticket.manager.js
  } catch (error) {
    next(error)
  }
}

async function createTicket (req, res, next) {
  try {
    // TODO: Pendiente de implementar
    // ! TODA VALIDACION NECESARIA SE HARA EN ticket.manager.js
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
