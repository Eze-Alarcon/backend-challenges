// Libraries
import express, { Router } from 'express'

// Controller
import { isAdmin } from '../../controllers/session.controller.js'

import {
  getProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  createProduct,
  productsMock
} from '../../controllers/product.controller.js'

export const productsRouter = Router()

productsRouter.use(express.json())

productsRouter
  .route('/mockingproducts')
  .get(productsMock)
  .post(productsMock)

productsRouter
  .route('/:pid')
  .get(getProduct)
  .put(isAdmin, updateProduct)
  .delete(isAdmin, deleteProduct)

productsRouter
  .route('/')
  .get(getProducts)
  .post(createProduct)
