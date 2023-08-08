// Services
import { productService } from '../services/product.service.js'

// Utils
import { STATUS_CODE } from '../utils/errors.messages.js'

async function getProduct (req, res, next) {
  try {
    const { product } = await productService.getOne({ id: req.params.pid })
    res
      .status(STATUS_CODE.SUCCESS.OK)
      .json({ product })
  } catch (error) {
    return next(error)
  }
}

async function getProducts (req, res, next) {
  try {
    const { products } = await productService.getMany(req.query ?? {})
    res
      .status(STATUS_CODE.SUCCESS.OK)
      .json({ products })
  } catch (error) {
    return next(error)
  }
}

async function createProduct (req, res, next) {
  try {
    const fields = {
      description: req.body.description,
      thumbnail: req.body.thumbnail ?? [],
      title: req.body.title,
      price: parseFloat(req.body.price),
      stock: parseInt(req.body.stock),
      owner: res.locals.owner
    }
    const { product } = await productService.createOne(fields)
    res
      .status(STATUS_CODE.SUCCESS.CREATED)
      .json({ product })
  } catch (error) {
    return next(error)
  }
}

async function updateProduct (req, res, next) {
  try {
    const { product_updated } = await productService.updateOne({ id: req.params.pid }, req.body)
    res
      .status(STATUS_CODE.SUCCESS.OK)
      .json({ product_updated })
  } catch (error) {
    return next(error)
  }
}

async function deleteProduct (req, res, next) {
  try {
    const { product_deleted } = await productService.deleteOne({ id: req.params.pid })
    res
      .status(STATUS_CODE.SUCCESS.NO_CONTENT)
      .json({ product_deleted })
  } catch (error) {
    return next(error)
  }
}

export {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
}
