/* eslint-disable space-before-function-paren */
import { productModel } from './models/products.schema.js'
import { cartModel } from './models/cart.schema.js'
import { ERRORS } from '../helpers/errors.messages.js'

// ===== Products DB Manager =====

class ProductsDB {
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

  async getItems(options) {
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

  async findItems(query) {
    const response = await this.#model.find(query).lean()
    if (response.length === 0) throw new Error()
    const data = this.#parseResponse(response)
    return data
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

class CartsDB {
  #model
  constructor(model) {
    this.#model = model
  }

  async findCartByID(cartRef) {
    try {
      const query = { ref: cartRef }
      const response = await super.findItems(query)
      return response[0]
    } catch (err) {
      throw new Error(ERRORS.CART_NOT_FOUND.ERROR_CODE)
    }
  }

  async deleteCart(cartRef) {
    const query = { ref: cartRef }
    const response = await super.deleteItem(query)
    return response
  }

  async getItems() {
    const data = await this.#model.find().lean()
    return data
  }

  async findItems(query) {
    const response = await this.#model.find(query).lean()
    if (response.length === 0) throw new Error()
    const data = super.parseResponse(response)
    return data
  }

  async createItem(item) {
    this.validateObject(item)
    try {
      const response = await this.#model.create(item)
      const data = this.parseResponse(response)
      return data
    } catch (err) {
      console.log(err)
    }
  }

  async updateItem(item) {
    this.validateObject(item)
    const data = await this.#model.updateOne((item))
    return data
  }

  async deleteItem(query) {
    const response = await this.#model.deleteOne(query)
    return response
  }

  async deleteAll() {
    const response = await this.#model.deleteMany()
    return response
  }
}

const PM_MONGO = new ProductsDB(productModel)
const CM_MONGO = new CartsDB(cartModel)

export { CM_MONGO, PM_MONGO }
