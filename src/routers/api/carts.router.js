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

// TODO: Pendientes de implementar (GET, POST, DELETE)
cartsRouter
  .route('/:cid/ticket')
  .get()
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
