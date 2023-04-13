'use strict'

/* eslint space-before-function-paren: 0 */
import { validateInputs, searchMatch } from '../helpers/validations.js'
import { SUCCESS } from '../helpers/errors.messages.js'
import { getMax } from '../helpers/getMax.js'
import { PM_MONGO } from './database.manager.js'
import { Product } from '../classes/product.class.js'

class ProductManager {
  #lastID
  #productsList
  constructor() {
    this.#lastID = 0
    this.#productsList = []
  }

  async getProducts(options = {}) {
    const products = await PM_MONGO.getItems(options)
    this.#productsList = [...products.payload]
    return {
      status_code: SUCCESS.GET.STATUS,
      products
    }
  }

  async getProductById(query) {
    const product = await PM_MONGO.getItems(query)
    return {
      status_code: SUCCESS.GET.STATUS,
      item: product.payload[0]
    }
  }

  async addProduct(fields) {
    const strictValidation = true
    validateInputs(fields, strictValidation)

    await this.getProducts()

    searchMatch(++this.#lastID, this.#productsList)
    this.#lastID = getMax(this.#productsList)

    const newProduct = new Product({ ...fields, id: ++this.#lastID })
    await PM_MONGO.createProduct(newProduct)

    return {
      status_code: SUCCESS.CREATED.STATUS,
      productAdded: newProduct
    }
  }

  async updateProduct(productID, fields) {
    const query = { id: productID }
    const { item } = await this.getProductById(query)

    validateInputs(fields)

    const newProduct = {
      description: fields.description ?? item.description,
      thumbnail: fields.thumbnail ?? item.thumbnail,
      title: fields.title ?? item.title,
      price: fields.price ?? item.price,
      stock: fields.stock ?? item.stock
    }

    await PM_MONGO.updateProduct(query, newProduct)
    return {
      status_code: SUCCESS.UPDATED.STATUS,
      itemUpdated: newProduct
    }
  }

  async deleteProduct(productID) {
    const query = { id: productID }

    const itemDeleted = await PM_MONGO.deleteProduct(query)

    return {
      status_code: SUCCESS.DELETED.STATUS,
      itemDeleted
    }
  }
}

const PM = new ProductManager()

export { PM }
