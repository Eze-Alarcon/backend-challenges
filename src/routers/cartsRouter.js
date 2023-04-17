'use strict'

import express, { Router } from 'express'
import {
  updateCartProducts,
  getCart,
  clearCartProducts,
  createNewCart,
  getAllCarts,
  deleteCartProduct
} from '../controllers/cart.controller.js'

export const cartsRouter = Router()

cartsRouter.use(express.json())

cartsRouter
  .route('/:cid/product/:pid')
  .put(updateCartProducts) // ✅
  .delete(deleteCartProduct) // TODO

cartsRouter
  .route('/:cid')
  .get(getCart)
  .delete(clearCartProducts) // ✅

cartsRouter
  .route('/')
  .post(createNewCart)
  .get(getAllCarts)
