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
    await ticketManager.getTicket()
  } catch (error) {
    next(error)
  }
}

async function createTicket (req, res, next) {
  try {
    const cartID = req.params.cid
    const token = req.signedCookies[COOKIE_NAME]
    const user = await verifyToken(token)

    const { ticket, cart, status } = await ticketManager.createTicket({ cartID, email: user.email })
    res.status(status).json({ ticket, cart })
  } catch (error) {
    next(error)
  }
}

async function deleteTicket (req, res, next) {
  try {
    await ticketManager.deleteTicket()
  } catch (error) {
    next(error)
  }
}

export {
  getTicket,
  createTicket,
  deleteTicket
}
