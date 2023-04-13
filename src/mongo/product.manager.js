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
    const { item } = await this.getProductById(productID)
    const product = item // ver si llegan otros mas y sino probar con item[0]

    validateInputs(fields)

    product.description = fields.description ?? product.description
    product.thumbnail = fields.thumbnail ?? product.thumbnail
    product.title = fields.title ?? product.title
    product.price = fields.price ?? product.price
    product.stock = fields.stock ?? product.stock

    await PM_MONGO.updateItem(product)
    return {
      status_code: SUCCESS.UPDATED.STATUS,
      itemUpdated: product
    }
  }

  async deleteProduct(productId) {
    const itemDeleted = await PM_MONGO.deleteProduct(productId)

    return {
      status_code: SUCCESS.DELETED.STATUS,
      itemDeleted
    }
  }
}

const PM = new ProductManager()

export { PM }
