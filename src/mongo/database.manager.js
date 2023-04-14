/* eslint-disable space-before-function-paren */
import { productModel } from './models/products.schema.js'
import { cartModel } from './models/cart.schema.js'
import { ERRORS } from '../helpers/errors.messages.js'

// ===== Products DB Manager =====

class DB_PRODUCT_MANAGER {
  #model
  constructor(model) {
    this.#model = model
  }

  #parseResponse(item) {
    return JSON.parse(JSON.stringify(item))
  }

  #handleQueries(options) {
    const pageOptions = {
      limit: options.limit || 10,
      page: options.page || 1,
      sort: { price: null },
      projection: { _id: 0 }
    }
    const pageQuery = {}

    for (const [key, value] of Object.entries(options)) {
      if (key !== 'limit' && key !== 'page' && key !== 'sort') pageQuery[key] = value

      if (key === 'sort' && (value === 'asc' || value === 1)) {
        pageOptions.sort.price = 'ascending'
      } else if (key === 'sort' && (value === 'desc' || value === -1)) {
        pageOptions.sort.price = 'descending'
      }
    }

    return { pageOptions, pageQuery }
  }

  async getProducts(options) {
    try {
      const { pageOptions, pageQuery } = this.#handleQueries(options)

      const data = await this.#model.paginate(pageQuery, pageOptions)
      return {
        payload: data.docs,
        status: data.status_code,
        totalPages: data.totalPages,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        page: data.page,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage
        // prevLink,
        // nextLink
      }
    } catch (err) {
      throw new Error(ERRORS.PRODUCT_NOT_FOUND.ERROR_CODE)
    }
  }

  async findProducts(query) {
    try {
      const response = await this.#model.find(query, { _id: 0 }).lean()
      return response
    } catch (err) {
      throw new Error(ERRORS.PRODUCT_NOT_FOUND.ERROR_CODE)
    }
  }

  async createProduct(item) {
    try {
      const response = await this.#model.create(item)
      const data = this.#parseResponse(response)
      return data
    } catch (err) {
      console.log(err)
    }
  }

  async updateProduct({ id }, updates) {
    const data = await this.#model.updateOne({ id }, updates)
    return data
  }

  async deleteProduct({ id }) {
    const response = await this.#model.deleteOne(id)
    return response
  }
}

// ===== Cart DB manager =====

class DB_CART_MANAGER {
  #model
  constructor(model) {
    this.#model = model
  }

  #parseResponse(item) {
    return JSON.parse(JSON.stringify(item))
  }

  async getCarts() {
    const response = await this.#model.find({}, { _id: 0 }).lean()
    return response
  }

  async findCartByID({ id }) {
    const response = await this.#model.find({ id }, { _id: 0 }).lean()
    if (response.length === 0) throw new Error(ERRORS.CART_NOT_FOUND.ERROR_CODE)
    return response[0]
  }

  async createCart(item) {
    try {
      const response = await this.#model.create(item)
      const data = this.#parseResponse(response)
      return data
    } catch (err) {
      console.log(err) // manejar mejor el error
    }
  }

  async updateItem({ id, item }) {
    this.validateObject(item)
    const data = await this.#model.updateOne({ id }, item)
    return data
  }

  async deleteCartProducts({ id }) {
    const response = await this.#model.deleteOne({ id })
    return response
  }

  async deleteAll() {
    const response = await this.#model.deleteMany()
    return response
  }
}

const DB_PRODUCTS = new DB_PRODUCT_MANAGER(productModel)
const DB_CARTS = new DB_CART_MANAGER(cartModel)

export { DB_CARTS, DB_PRODUCTS }
