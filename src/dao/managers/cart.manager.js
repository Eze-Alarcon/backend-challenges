'use strict'

/* eslint space-before-function-paren: 0 */
import { Cart } from '../../classes/cart.class.js'
import { SUCCESS, ERRORS } from '../../helpers/errors.messages.js'
import { getMax } from '../../helpers/getMax.js'
import { validateQuantity } from '../../helpers/validations.js'
import { PM as productManager } from './product.manager.js'
import { DB_CARTS } from '../database/carts.database.js'

/* -------------------------------------------- */

class CartManager {
  #lastID
  #cartsList
  constructor() {
    this.#cartsList = []
    this.#lastID = 0
  }

  #parseData(value) {
    return JSON.parse(JSON.stringify(value))
  }

  #findIndex(arr, searchedValue) {
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

  async getCarts() {
    try {
      const carts = await DB_CARTS.getCarts()
      this.#cartsList = [...carts]
      return {
        status_code: SUCCESS.GET.STATUS,
        carts
      }
    } catch (err) {
      throw new Error(ERRORS.GET_CARTS.ERROR_CODE)
    }
  }

  async createCart() {
    try {
      await this.getCarts()
      this.#lastID = getMax(this.#cartsList)

      const newCart = new Cart({ id: ++this.#lastID })

      await DB_CARTS.createCart(newCart)

      return {
        status_code: SUCCESS.CART_CREATED.STATUS,
        cart: newCart
      }
    } catch (err) {
      throw new Error(ERRORS.CREATE_CARTS.ERROR_CODE)
    }
  }

  async getCartById(query) {
    try {
      const cart = await DB_CARTS.findCartByID({ id: query })
      const totalProducts = cart.products.reduce((acc, el) => acc + el.quantity, 0)
      return {
        status_code: SUCCESS.GET_CART.STATUS,
        totalProducts,
        cart
      }
    } catch (err) {
      throw new Error(ERRORS.CART_NOT_FOUND.ERROR_CODE)
    }
  }

  async addProductToCart({ cartID, productID, quantityValue = null }) {
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
        status_code: SUCCESS.CART_PRODUCT.STATUS,
        operationDetails: response
      }
    } catch (err) {
      throw new Error(ERRORS.ADD_PRODUCT_TO_CART.ERROR_CODE)
    }
  }

  async deleteAllCartProducts(query) {
    try {
      const cartUpdated = await DB_CARTS.deleteAllCartProducts({ id: query })

      return {
        status_code: SUCCESS.DELETED.STATUS,
        cartUpdated
      }
    } catch (err) {
      throw new Error(ERRORS.CART_NOT_FOUND.ERROR_CODE)
    }
  }

  async deleteCartProduct({ cartID, productID }) {
    try {
      const { item: product } = await productManager.getProductById({ id: productID })
      const parsedID = this.#parseData(product._id)

      const details = await DB_CARTS.deleteCartProduct({ id: cartID, productID: parsedID })

      return {
        status_code: SUCCESS.DELETED.STATUS,
        details
      }
    } catch (err) {
      throw new Error(ERRORS.CART_NOT_FOUND.ERROR_CODE)
    }
  }
}

const CM = new CartManager()

export { CM }
