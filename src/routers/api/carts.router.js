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

import { createTicket } from '../../controllers/ticket.controller.js'

// Middleware
import { hasSession } from '../../middleware/session.js'

export const cartsRouter = Router()

cartsRouter.use(express.json())

cartsRouter
  .route('/:cid/ticket')
  // TODO: Pendientes de implementar (GET, POST, DELETE)
  .get() // ! ver si es necesario, leer ticket.manager.js
  .post(createTicket)
  .delete()

cartsRouter
  .route('/:cid/product/:pid')
  .put(hasSession, updateCartProducts)
  .delete(hasSession, deleteCartProduct)

cartsRouter
  .route('/:cid')
  .get(hasSession, getCart)
  .delete(hasSession, clearCartProducts)

cartsRouter
  .route('/')
  .post(hasSession, createNewCart)
  .get(hasSession, getAllCarts)
