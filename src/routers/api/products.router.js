// Libraries
import express, { Router } from 'express'

// Controller
import { isAdmin } from '../../controllers/session.controller.js'
import {
  getProducts,
  updateProduct,
  deleteProduct,
  getAllProducts,
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
  .get(getProducts)
  .put(isAdmin, updateProduct)
  .delete(isAdmin, deleteProduct)

productsRouter
  .route('/')
  .get(getAllProducts)
  .post(isAdmin, createProduct)
