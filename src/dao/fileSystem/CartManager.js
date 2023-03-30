'use strict'

/* eslint space-before-function-paren: 0 */
import { PM } from './ProductManager.js'
import { CartProducts, Carts } from './Cart.js'
import { fileSystemManager } from './fileSystemManager.js'
import { ERRORS, SUCCESS } from '../../mocks/messages.js'
import { encryptID } from '../../logic/cripto.js'
import { getMax } from '../../logic/helpers.js'

/* -------------------------------------------- */

class CartManager extends fileSystemManager {
  #lastID
  constructor(path) {
    super(path)
    this.cartsList = []
    this.#lastID = 0
  }

  async clearCart() {
    await super.resetDataFile()
    this.cartsList = []
  }

  async #loadCarts() {
    const carts = await super.loadDataFile()
    this.cartsList = [...carts]
  }

  async #getCarts() {
    await this.#loadCarts()
    return this.cartsList
  }

  async #getIndex(cartID) {
    await this.#getCarts()

    const idToCompare = encryptID(cartID)
    const cartIndex = this.cartsList.findIndex((item) => item.id === idToCompare)

    if (cartIndex === -1) throw new Error(ERRORS.CART_NOT_FOUND.ERROR_CODE)

    return cartIndex
  }

  async createCart() {
    await this.#getCarts()

    this.#lastID = getMax(this.cartsList)

    const newCart = new Carts(++this.#lastID)
    this.cartsList.push(newCart)

    await super.writeDataFile(this.cartsList)

    return {
      status_code: SUCCESS.CART_CREATED.STATUS,
      cart: newCart
    }
  }

  async getCartById(cartID) {
    const cartIndex = await this.#getIndex(cartID)
    const cart = this.cartsList[cartIndex]

    const totalProducts = cart.products.reduce((acc, el) => acc + el.quantity, 0)

    return {
      status_code: SUCCESS.GET_CART.STATUS,
      totalProducts,
      cart
    }
  }

  async getCartProductsById(cartID, productID) {
    await this.#getCarts()

    const { cart } = await this.getCartById(cartID)
    const { item } = await PM.getProductById(productID)

    const productIndex = cart.products.findIndex((el) => el.productRef === item.id)

    return {
      status_code: SUCCESS.GET_CART.STATUS,
      productsList: cart.products[productIndex]
    }
  }

  async addProductToCart(cartID, productID) {
    await this.#getCarts()

    const { cart } = await this.getCartById(cartID)
    const { item } = await PM.getProductById(productID)

    const productIndex = cart.products.findIndex((el) => el.productRef === item.id)

    if (productIndex !== -1) {
      ++cart.products[productIndex].quantity

      await super.writeDataFile(this.cartsList)

      return {
        status_code: SUCCESS.INCREASE_QUANTITY.STATUS,
        productAdded: cart.products[productIndex]
      }
    }

    const newCartProduct = new CartProducts({ id: item.id })

    cart.products.push(newCartProduct)

    await super.writeDataFile(this.cartsList)

    return {
      status_code: SUCCESS.CART_PRODUCT.STATUS,
      productAdded: cart
    }
  }

  async deleteCart(cartID) {
    const cartIndex = await this.#getIndex(cartID)

    const cartDeleted = this.cartsList.splice(cartIndex, 1)
    await super.writeDataFile(this.cartsList)

    return {
      status_code: SUCCESS.DELETED.STATUS,
      deleted: cartDeleted
    }
  }
}

const CM = new CartManager('./src/storage/carts.json')

export { CM }
