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

export const productsRouter = Router()

productsRouter.use(express.json())

productsRouter
  .route('/:pid')
  .get(getProducts)
  .put(updateProduct)
  .delete(deleteProduct)

productsRouter
  .route('/')
  .get(getAllProducts)
  .post(createProduct)
