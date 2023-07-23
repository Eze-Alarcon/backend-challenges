// Services
import { productService } from '../services/product.service.js'

const getProducts = async (req, res, next) => {
  try {
    const id = { id: req.params.pid }
    const response = await productService.getProductById(id)

    res.status(response.status_code).json({ product: response.item })
  } catch (error) {
    return next(error.message)
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const id = { id: req.params.pid }
    const response = await productService.updateProduct(id, req.body)

    res.status(response.status_code).json(response.itemUpdated)
  } catch (error) {
    return next(error.message)
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const id = { id: req.params.pid }
    const response = await productService.deleteProduct(id)

    res.status(response.status_code).json({ product_deleted: response.itemDeleted })
  } catch (error) {
    return next(error.message)
  }
}

const getAllProducts = async (req, res, next) => {
  try {
    const response = await productService.getProducts(req.query)
    res.status(response.status_code).json(response.products)
  } catch (error) {
    return next(error.message)
  }
}

const createProduct = async (req, res, next) => {
  try {
    const response = await productService.addProduct(req.body)
    res.status(response.status_code).json(response.productAdded)
  } catch (error) {
    return next(error.message)
  }
}

export {
  getProducts,
  updateProduct,
  deleteProduct,
  getAllProducts,
  createProduct
}
