// Libraries
import { Router } from 'express'

// Controller
import { isAuthorized } from '../../controllers/session.controller.js'
import {
  getProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  createProduct
} from '../../controllers/product.controller.js'

export const productsRouter = Router()

productsRouter
  .route('/:pid')
  .get(getProduct)
  .put(isAuthorized, updateProduct)
  .delete(isAuthorized, deleteProduct)

productsRouter
  .route('/')
  .get(getProducts)
  .post(isAuthorized, createProduct)
