// Services
import { productService } from '../services/product.service.js'

import { createMockProducts } from '../mocks/product.mock.js'

const getProducts = async (req, res, next) => {
  try {
    const id = { id: req.params.pid }
    const response = await productService.getProductById(id)

    res.status(response.status_code).json({ product: response.item })
  } catch (error) {
    return next(error)
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const id = { id: req.params.pid }
    const response = await productService.updateProduct(id, req.body)

    res.status(response.status_code).json(response.itemUpdated)
  } catch (error) {
    return next(error)
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const id = { id: req.params.pid }
    const response = await productService.deleteProduct(id)

    res.status(response.status_code).json({ product_deleted: response.itemDeleted })
  } catch (error) {
    return next(error)
  }
}

const getAllProducts = async (req, res, next) => {
  try {
    const response = await productService.getProducts(req.query)
    res.status(response.status_code).json(response.products)
  } catch (error) {
    return next(error)
  }
}

const createProduct = async (req, res, next) => {
  try {
    const response = await productService.addProduct(req.body)
    res.status(response.status_code).json(response.productAdded)
  } catch (error) {
    return next(error)
  }
}

const productsMock = async (req, res, next) => {
  try {
    const testResults = await createMockProducts()
    res.status(201).json({ message: 'test completed', products: testResults })
  } catch (error) {
    return next(error)
  }
}

export {
  getProducts,
  updateProduct,
  deleteProduct,
  getAllProducts,
  createProduct,
  productsMock
}
