import { Cart } from '../models/cart.class.js'
import { STATUS_CODE, CART_MANAGER_ERRORS } from '../utils/errors.messages.js'
import { validateQuantity } from '../utils/validations.js'
import { productManager } from './product.manager.js'
import { DB_CARTS } from '../services/carts.database.js'

/* -------------------------------------------- */

class CartManager {
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

  async getCarts () {
    try {
      const carts = await DB_CARTS.getCarts()
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
      const newCartID = await DB_CARTS.getLastID()

      const newCart = new Cart({ id: newCartID })

      await DB_CARTS.createCart(newCart.getCartData())

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
      const cart = await DB_CARTS.findCartByID({ id: query })
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
      validateQuantity(quantityValue)
      const cart = await DB_CARTS.findCartByID({ id: cartID })
      const { item: product } = await productManager.getProductById({ id: productID })
      let response

      const parsedID = this.#parseData(product._id)
      const { exist, index } = this.#findIndex(cart, parsedID)

      if (!exist) {
        response = await DB_CARTS.addProductToCart({ id: cartID, productID: product._id })
      }

      if (exist) {
        const newValue = quantityValue ?? ++cart.products[index].quantity

        const updateInfo = {
          id: cartID,
          productID: parsedID,
          quantity: newValue
        }

        response = await DB_CARTS.updateCartProductQuantity(updateInfo)
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
      const cartUpdated = await DB_CARTS.deleteAllCartProducts({ id: query })

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
      const { item: product } = await productManager.getProductById({ id: productID })
      const parsedID = this.#parseData(product._id)

      const details = await DB_CARTS.deleteCartProduct({ id: cartID, productID: parsedID })

      return {
        status_code: STATUS_CODE.SUCCESS.OK,
        details
      }
    } catch (err) {
      throw new Error(CART_MANAGER_ERRORS.CART_NOT_FOUND.ERROR_CODE)
    }
  }
}

const cartManager = new CartManager()

export { cartManager }
