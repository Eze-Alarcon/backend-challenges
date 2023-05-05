import express, { Router } from 'express'
import {
  updateCartProducts,
  getCart,
  clearCartProducts,
  createNewCart,
  getAllCarts,
  deleteCartProduct
} from '../controllers/cart.controller.js'
import { hasSession } from '../middleware/session.js'

export const cartsRouter = Router()

cartsRouter.use(express.json())

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
