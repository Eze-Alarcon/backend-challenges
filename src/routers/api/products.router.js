// Libraries
import { Router } from 'express'

// Controller
import { isAuthorized } from '../../controllers/session.controller.js'
import {
  getProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  createProduct,
  productsMock
} from '../../controllers/product.controller.js'

export const productsRouter = Router()

productsRouter
  .route('/mockingproducts')
  .get(productsMock)
  .post(productsMock)

productsRouter
  .route('/:pid')
  .get(getProduct)
  .put(isAuthorized, updateProduct)
  .delete(isAuthorized, deleteProduct)

productsRouter
  .route('/')
  .get(getProducts)
  .post(isAuthorized, createProduct)
