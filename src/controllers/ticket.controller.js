// DAOs
import { ticketService } from '../services/ticket.service.js'

// config
import { COOKIE_NAME } from '../config/config.js'

// Utils
import { verifyToken } from '../utils/jwt.config.js'
import { STATUS_CODE } from '../utils/errors.messages.js'

async function createTicket (req, res, next) {
  try {
    const cartID = req.params.cid
    const token = req.signedCookies[COOKIE_NAME]
    const user = await verifyToken(token)

    const { ticket, cart } = await ticketService.createTicket({ cartID, email: user.email })
    res.status(STATUS_CODE.SUCCESS.CREATED).json({ ticket, cart })
  } catch (error) {
    next(error)
  }
}

// not implemented
async function getTicket (req, res, next) {
  try {
    await ticketService.getTicket({ ticketID: req.body })
  } catch (error) {
    next(error)
  }
}

// not implemented
async function deleteTicket (req, res, next) {
  try {
    await ticketService.deleteTicket()
  } catch (error) {
    next(error)
  }
}

export {
  getTicket,
  createTicket,
  deleteTicket
}
