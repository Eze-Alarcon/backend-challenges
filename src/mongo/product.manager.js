'use strict'

/* eslint space-before-function-paren: 0 */
import { validateInputs, searchMatch } from '../helpers/validations.js'
import { SUCCESS } from '../helpers/errors.messages.js'
import { getMax } from '../helpers/getMax.js'
import { DB_PRODUCTS } from './database.manager.js'
import { Product } from '../classes/product.class.js'

class ProductManager {
  #lastID
  #productsList
  constructor() {
    this.#lastID = 0
    this.#productsList = []
  }

  async getProducts(options = {}) {
    const products = await DB_PRODUCTS.getProducts(options)
    this.#productsList = [...products.payload]
    return {
      status_code: SUCCESS.GET.STATUS,
      products
    }
  }

  async getProductById(query) {
    const product = await DB_PRODUCTS.findProducts(query)
    return {
      status_code: SUCCESS.GET.STATUS,
      item: product[0]
    }
  }

  async addProduct(fields) {
    const strictValidation = true
    validateInputs(fields, strictValidation)

    await this.getProducts()

    searchMatch(++this.#lastID, this.#productsList)
    this.#lastID = getMax(this.#productsList)

    const newProduct = new Product({ ...fields, id: ++this.#lastID })
    await DB_PRODUCTS.createProduct(newProduct)

    return {
      status_code: SUCCESS.CREATED.STATUS,
      productAdded: newProduct
    }
  }

  async updateProduct(query, fields) {
    const { item } = await this.getProductById(query)

    validateInputs(fields)

    console.log(fields)

    const newProduct = {
      ...item,
      description: fields.description ?? item.description,
      thumbnail: fields.thumbnail ?? item.thumbnail,
      category: fields.category ?? item.category,
      title: fields.title ?? item.title,
      price: fields.price ?? item.price,
      stock: fields.stock ?? item.stock
    }

    console.log(newProduct)

    await DB_PRODUCTS.updateProduct(query, newProduct)
    return {
      status_code: SUCCESS.UPDATED.STATUS,
      itemUpdated: newProduct
    }
  }

  async deleteProduct(query) {
    const itemDeleted = await DB_PRODUCTS.deleteProduct({ id: query })

    return {
      status_code: SUCCESS.DELETED.STATUS,
      itemDeleted
    }
  }
}

const PM = new ProductManager()

export { PM }
