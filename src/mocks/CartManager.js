/* eslint space-before-function-paren: 0 */
import fs from 'fs/promises'
import { encryptID } from '../logic/cripto'
import { ERRORS, SUCCESS } from './messages'
import { PM } from './ProductManager'
import { getMax } from '../logic/helpers'
import { CartProducts, Carts } from './Cart'

class CartManager {
  #path
  #lastID
  constructor(path) {
    this.#path = path
    this.#lastID = 0
    this.cartsList = []
  }

  async reset() {
    await fs.writeFile(this.#path, '[]')
    this.cartsList = []
  }

  async #writeData() {
    const json = JSON.stringify(this.cartsList, null, 2)
    await fs.writeFile(this.#path, json)
  }

  async #loadData() {
    const rawData = await fs.readFile(this.#path, 'utf-8')
    if (rawData === '') {
      this.cartsList = []
      return
    }
    const data = JSON.parse(rawData)
    this.cartsList = [...data]
  }

  async #getIndex(cartID) {
    await this.getCarts()

    const idToCompare = encryptID(cartID)
    const cartIndex = this.cartsList.findIndex((item) => item.id === idToCompare)

    if (cartIndex === -1) throw new Error(ERRORS.CART_NOT_FOUND.ERROR_CODE)

    return cartIndex
  }

  async #getCarts() {
    await this.#loadData()
    return this.cartsList
  }

  async createCart() {
    await this.#getCarts()

    this.#lastID = getMax(this.cartsList)

    const newCart = new Carts(++this.#lastID)
    this.cartsList.push(newCart)

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

    if (productIndex === -1) {
      cart.products[productIndex].quantity += 1

      return {
        status_code: SUCCESS.INCREASE_QUANTITY.STATUS,
        productUpdated: cart.products[productIndex]
      }
    }

    const newCartProduct = CartProducts({ id: item.productID, quantity: 1 })

    cart.products.push(newCartProduct)

    await this.#writeData()

    return {
      status_code: SUCCESS.PRODUCT_ADD_TO_CART.STATUS,
      productAdded: cart.products // puede fallar y mostrar [], revisar!
    }
  }

  async deleteCart(cartID) {
    const cartIndex = await this.#getIndex(cartID)

    const cartDeleted = this.productsList.splice(cartIndex, 1)
    await this.#writeData()

    return {
      status_code: SUCCESS.DELETED.STATUS,
      cartDeleted
    }
  }
}

const CM = new CartManager('./src/storage/carts.json')

export { CM }
