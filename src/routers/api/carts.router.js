// Libraries
import express, { Router } from 'express'

// Controller
import {
  updateCartProducts,
  getCart,
  clearCartProducts,
  createNewCart,
  getAllCarts,
  deleteCartProduct
} from '../../controllers/cart.controller.js'

import {
  createTicket,
  deleteTicket,
  getTicket
} from '../../controllers/ticket.controller.js'

// Middleware
import { hasSession } from '../../middleware/autentication.js'

export const cartsRouter = Router()

cartsRouter.use(express.json())
cartsRouter.use(hasSession)

cartsRouter
  .route('/:cid/ticket')
  .get(getTicket)
  .post(createTicket)
  .delete(deleteTicket)

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
  .post(createNewCart)
  .get(getAllCarts)
