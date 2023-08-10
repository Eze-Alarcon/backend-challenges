// Utils
import { STATUS_CODE } from '../utils/errors.messages.js'

// Services
import { cartService } from '../services/cart.service.js'

const getAllCarts = async (req, res, next) => {
  try {
    const { carts } = await cartService.getMany()
    res
      .status(STATUS_CODE.SUCCESS.OK)
      .json(carts)
  } catch (error) {
    next(error)
  }
}

const getCart = async (req, res, next) => {
  try {
    const { cart, total_products } = await cartService.getOne({ id: req.params.cid })
    res
      .status(STATUS_CODE.SUCCESS.OK)
      .json({ cart, total: total_products })
  } catch (error) {
    next(error)
  }
}

const updateCartProducts = async (req, res, next) => {
  try {
    const query = {
      cartID: req.params.cid,
      productID: req.params.pid,
      quantityValue: req.body?.quantity ?? null
    }
    const { details } = await cartService.createCartProduct(query)
    res
      .status(STATUS_CODE.SUCCESS.OK)
      .json({ details })
  } catch (error) {
    next(error)
  }
}

const clearCartProducts = async (req, res, next) => {
  try {
    const { cart_updated } = await cartService.deleteManyCartProducts({ id: req.params.cid })
    res
      .status(STATUS_CODE.SUCCESS.NO_CONTENT)
      .json(cart_updated)
  } catch (error) {
    next(error)
  }
}

const deleteCartProduct = async (req, res, next) => {
  try {
    const query = {
      cartID: req.params.cid,
      productID: req.params.pid
    }
    const { product_removed } = await cartService.deleteOneCartProduct(query)
    res
      .status(STATUS_CODE.SUCCESS.NO_CONTENT)
      .json(product_removed)
  } catch (error) {
    next(error)
  }
}

export {
  updateCartProducts,
  getCart,
  clearCartProducts,
  getAllCarts,
  deleteCartProduct
}
