// Libraries
import { Router } from 'express'

// Controller
import {
  updateCartProducts,
  getCart,
  clearCartProducts,
  getAllCarts,
  deleteCartProduct
} from '../../controllers/cart.controller.js'

import {
  createTicket
  // deleteTicket,
  // getTicket
} from '../../controllers/ticket.controller.js'

// Middleware
// import { hasSession } from '../../middleware/autentication.js'

export const cartsRouter = Router()

// cartsRouter.use(hasSession)

cartsRouter
  .route('/:cid/ticket')
  .post(createTicket)
// .get(getTicket) // not implemented
// .delete(deleteTicket) // not implemented

cartsRouter
  .route('/:cid/product/:pid')
  .put(updateCartProducts)
  .delete(deleteCartProduct)

cartsRouter
  .route('/:cid')
  .get(getCart)
  .delete(clearCartProducts)

cartsRouter
  .route('/')
  .get(getAllCarts)
