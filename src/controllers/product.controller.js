import { productManager } from '../dao/managers/product.manager.js'

const getProducts = async (req, res, next) => {
  try {
    const id = { id: req.params.pid }
    const response = await productManager.getProductById(id)

    res.status(response.status_code).json({ product: response.item })
  } catch (error) {
    return next(error.message)
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const id = { id: req.params.pid }
    const response = await productManager.updateProduct(id, req.body)

    res.status(response.status_code).json(response.itemUpdated)
  } catch (error) {
    return next(error.message)
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const id = { id: req.params.pid }
    const response = await productManager.deleteProduct(id)

    res.status(response.status_code).json({ product_deleted: response.itemDeleted })
  } catch (error) {
    return next(error.message)
  }
}

const getAllProducts = async (req, res, next) => {
  try {
    const response = await productManager.getProducts(req.query)
    res.status(response.status_code).json(response.products)
  } catch (error) {
    return next(error.message)
  }
}

const createProduct = async (req, res, next) => {
  try {
    const response = await productManager.addProduct(req.body)
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
