'use strict'

import express, { Router } from 'express'
import { CM as cartManager } from '../mongo/cart.manager.js'

export const cartsRouter = Router()

cartsRouter.use(express.json())

cartsRouter
  .route('/:cid/product/:pid')
  .post(async (req, res, next) => {
    try {
      const query = {
        cartID: req.params.cid,
        productID: req.params.pid
      }
      const response = await cartManager.addProductToCart(query)
      res.status(response.status_code).json(response.productAdded)
    } catch (error) {
      return next(error.message)
    }
  })

cartsRouter
  .route('/:cid')
  .get(async (req, res, next) => {
    try {
      const query = req.params.cid
      const response = await cartManager.getCartById(query)
      res.status(response.status_code).json(
        {
          cart: response.cart,
          totalProducts: response.totalProducts
        })
    } catch (error) {
      return next(error.message)
    }
  })
  .delete(async (req, res, next) => {
    try {
      const query = req.params.cid
      const response = await cartManager.deleteCartProducts(query)
      res.status(response.status_code).json({ deleted: response.deleted, cart_deleted: response.carts_deleted })
    } catch (error) {
      return next(error.message)
    }
  })

cartsRouter
  .route('/')
  .post(async (req, res, next) => {
    try {
      const response = await cartManager.createCart()
      res.status(response.status_code).json(response.cart)
    } catch (error) {
      return next(error.message)
    }
  })
  .get(async (req, res, next) => {
    try {
      const response = await cartManager.getCarts()
      res.status(response.status_code).json(response)
    } catch (error) {
      next(error.message)
    }
  })
