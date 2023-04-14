'use strict'

/* eslint space-before-function-paren: 0 */
import { CartProducts, Carts } from '../classes/cart.class.js'
import { SUCCESS } from '../helpers/errors.messages.js'
import { getMax } from '../helpers/getMax.js'
import { DB_CARTS, DB_PRODUCTS } from './database.manager.js'

/* -------------------------------------------- */

class CartManager {
  #lastID
  #cartsList
  constructor() {
    this.#cartsList = []
    this.#lastID = 0
  }

  async getCarts() {
    const carts = await DB_CARTS.getCarts()
    console.log('getCarts in manager')
    this.#cartsList = [...carts]
    return {
      status_code: SUCCESS.GET.STATUS,
      carts
    }
  }

  async createCart() {
    await this.getCarts()

    this.#lastID = getMax(this.#cartsList)

    const newCart = new Carts({ id: ++this.#lastID })

    await DB_CARTS.createCart(newCart)

    return {
      status_code: SUCCESS.CART_CREATED.STATUS,
      cart: newCart
    }
  }

  async getCartById(query) {
    const cart = await DB_CARTS.findCartByID({ id: query })
    const totalProducts = cart.products.reduce((acc, el) => acc + el.quantity, 0)
    return {
      status_code: SUCCESS.GET_CART.STATUS,
      totalProducts,
      cart
    }
  }

  async addProductToCart({ cartID, productID }) {
    await this.getCarts()

    const cart = await DB_CARTS.findCartByID({ id: cartID })
    const product = await DB_PRODUCTS.findProducts({ id: productID })

    const productIndex = cart.products.findIndex((el) => el.productCode === product.code)

    if (productIndex !== -1) {
      ++cart.products[productIndex].quantity

      await DB_CARTS.updateItem(cart)

      return {
        status_code: SUCCESS.INCREASE_QUANTITY.STATUS,
        productAdded: cart
      }
    }

    const newCartProduct = new CartProducts({ id: product.id })

    cart.products.push(newCartProduct)

    await DB_CARTS.updateItem(cart)

    return {
      status_code: SUCCESS.CART_PRODUCT.STATUS,
      productAdded: cart
    }
  }

  async deleteCartProducts(query) {
    const cartDeleted = await DB_CARTS.deleteCartProducts({ id: query })

    const deleted = cartDeleted.deletedCount > 0

    return {
      status_code: SUCCESS.DELETED.STATUS,
      carts_deleted: cartDeleted.deletedCount,
      deleted
    }
  }
}

const CM = new CartManager()

export { CM }
