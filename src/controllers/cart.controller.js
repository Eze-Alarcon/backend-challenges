import { CM as cartManager } from '../dao/managers/cart.manager.js'

const updateCartProducts = async (req, res, next) => {
  try {
    const query = {
      cartID: req.params.cid,
      productID: req.params.pid,
      quantityValue: req.body?.quantity ?? null
    }
    const response = await cartManager.addProductToCart(query)
    res.status(response.status_code).json({ details: response.operationDetails })
  } catch (error) {
    return next(error.message)
  }
}

const getCart = async (req, res, next) => {
  try {
    const query = req.params.cid
    const response = await cartManager.getCartById(query)
    res.status(response.status_code).json(
      {
        cart: response.cart,
        totalProducts: response.totalProducts
      })
  } catch (error) {
    return next(error.message)
  }
}

const clearCartProducts = async (req, res, next) => {
  try {
    const query = req.params.cid
    const response = await cartManager.deleteAllCartProducts(query)
    res.status(response.status_code).json(response.cartUpdated)
  } catch (error) {
    return next(error.message)
  }
}

const createNewCart = async (req, res, next) => {
  try {
    const response = await cartManager.createCart()
    res.status(response.status_code).json(response.cart)
  } catch (error) {
    return next(error.message)
  }
}

const getAllCarts = async (req, res, next) => {
  try {
    const response = await cartManager.getCarts()
    res.status(response.status_code).json(response.carts)
  } catch (error) {
    next(error.message)
  }
}

const deleteCartProduct = async (req, res, next) => {
  try {
    const query = {
      cartID: req.params.cid,
      productID: req.params.pid
    }
    const response = await cartManager.deleteCartProduct(query)
    res.status(response.status_code).json(response.details)
  } catch (error) {
    next(error.message)
  }
}

export {
  updateCartProducts,
  getCart,
  clearCartProducts,
  createNewCart,
  getAllCarts,
  deleteCartProduct
}
