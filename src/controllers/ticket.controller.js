// DAOs
import { ticketManager } from '../services/ticket.service.js'

// config
import { COOKIE_NAME } from '../config/config.js'

// middleware
import { verifyToken } from '../middleware/jwt.config.js'

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
    // const cartID = req.params.cid
    // const token = req.signedCookies[COOKIE_NAME]
    // const user = await verifyToken(token)
    // console.log(user)

    // await ticketManager.createTicket({ cartID, email: user.email })
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
