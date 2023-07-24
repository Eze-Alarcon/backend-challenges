// Models
import { Cart } from '../models/cart.model.js'
import { CustomError } from '../models/error.model.js'

// Services
import { productService } from './product.service.js'

// DAOs
import { DAO_CARTS } from '../dao/carts.database.js'

// Utils
import { validateQuantity } from '../utils/validations.js'
import { STATUS_CODE, CART_MANAGER_ERRORS } from '../utils/errors.messages.js'

/* -------------------------------------------- */

class CartService {
  #parseData (value) {
    return JSON.parse(JSON.stringify(value))
  }

  #findIndex (arr, searchedValue) {
    const productIndex = arr.products.findIndex((el) => {
      const parseElement = el.product._id
      const productID = this.#parseData(parseElement)
      return productID === searchedValue
    })
    return {
      exist: productIndex !== -1,
      index: productIndex
    }
  }

  async checkCart ({ cartID }) {
    const { cart } = await this.getCartById(cartID)
    const productsAvailables = []
    for (const item of cart.products) {
      const { item: storeProduct } = await productService.getProductById({ id: item.product.id })
      if (item.quantity > storeProduct.stock) continue
      productsAvailables.push({ ...item.product, quantity: item.quantity })
    }
    return { cart, productsAvailables }
  }

  async getCarts () {
    try {
      const carts = await DAO_CARTS.getCarts()
      return {
        status_code: STATUS_CODE.SUCCESS.OK,
        carts
      }
    } catch (err) {
      throw new Error(CART_MANAGER_ERRORS.CART_NOT_FOUND.ERROR_CODE)
    }
  }

  async createCart () {
    try {
      const newCartID = await DAO_CARTS.getLastID()

      const newCart = new Cart({ id: newCartID })

      await DAO_CARTS.createCart(newCart.getCartData())

      return {
        status_code: STATUS_CODE.SUCCESS.OK,
        cart: newCart.getCartData()
      }
    } catch (err) {
      throw new Error(CART_MANAGER_ERRORS.CREATE_CARTS.ERROR_CODE)
    }
  }

  async getCartById (query) {
    try {
      const cart = await DAO_CARTS.findCartByID({ id: query })
      const totalProducts = cart.products.reduce((acc, el) => acc + el.quantity, 0)
      return {
        status_code: STATUS_CODE.SUCCESS.OK,
        totalProducts,
        cart
      }
    } catch (err) {
      throw new Error(CART_MANAGER_ERRORS.CART_NOT_FOUND.ERROR_CODE)
    }
  }

  async addProductToCart ({ cartID, productID, quantityValue = null }) {
    try {
      const { error } = validateQuantity(quantityValue)
      if (error !== undefined) CustomError.userError(error)

      const cart = await DAO_CARTS.findCartByID({ id: cartID })
      const { item: product } = await productService.getProductById({ id: productID })
      let response

      const parsedID = this.#parseData(product._id)
      const { exist, index } = this.#findIndex(cart, parsedID)

      if (!exist) {
        response = await DAO_CARTS.addProductToCart({ id: cartID, productID: product._id })
      }

      if (exist) {
        const newValue = quantityValue ?? ++cart.products[index].quantity

        const updateInfo = {
          id: cartID,
          productID: parsedID,
          quantity: newValue
        }

        response = await DAO_CARTS.updateCartProductQuantity(updateInfo)
      }

      return {
        status_code: STATUS_CODE.SUCCESS.OK,
        operationDetails: response
      }
    } catch (err) {
      throw new Error(CART_MANAGER_ERRORS.ADD_PRODUCT_TO_CART.ERROR_CODE)
    }
  }

  async deleteAllCartProducts (query) {
    try {
      const cartUpdated = await DAO_CARTS.deleteAllCartProducts({ id: query })

      return {
        status_code: STATUS_CODE.SUCCESS.OK,
        cartUpdated
      }
    } catch (err) {
      throw new Error(CART_MANAGER_ERRORS.CART_NOT_FOUND.ERROR_CODE)
    }
  }

  async deleteCartProduct ({ cartID, productID }) {
    try {
      const { item: product } = await productService.getProductById({ id: productID })
      const parsedID = this.#parseData(product._id)

      const details = await DAO_CARTS.deleteCartProduct({ id: cartID, productID: parsedID })

      return {
        status_code: STATUS_CODE.SUCCESS.OK,
        details
      }
    } catch (err) {
      throw new Error(CART_MANAGER_ERRORS.CART_NOT_FOUND.ERROR_CODE)
    }
  }
}

const cartService = new CartService()

export { cartService }
