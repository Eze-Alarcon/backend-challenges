// Libraries
import express, { Router } from 'express'

// Controller
import {
  getProducts,
  updateProduct,
  deleteProduct,
  getAllProducts,
  createProduct
} from '../../controllers/product.controller.js'

// Middleware
import { hasSession } from '../../middleware/autentication.js'

import { isAdmin } from '../../controllers/session.controller.js'

export const productsRouter = Router()

productsRouter.use(express.json())
productsRouter.use(hasSession)

productsRouter
  .route('/:pid')
  .get(getProducts)
  .put(isAdmin, updateProduct)
  .delete(isAdmin, deleteProduct)

productsRouter
  .route('/')
  .get(getAllProducts)
  .post(isAdmin, createProduct)
