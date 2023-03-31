/* eslint-disable space-before-function-paren */
import { productSchema } from '../models/products.schema.js'
import { cartSchema } from '../models/cart.schema.js'
import { messageSchema } from '../models/messages.schema.js'
import mongoose from 'mongoose'

class databaseManager {
  #collection
  #schema
  constructor(colection, schema) {
    this.#collection = colection
    this.#schema = schema
  }

  validateObject(item) {
    if (typeof (item) !== 'object' || Array.isArray(item)) throw new Error() // handle message error
  }

  parseResponse(item) {
    return JSON.parse(JSON.stringify(item))
  }

  async getItems() {
    const data = await mongoose.model(this.#collection, this.#schema).find().lean()
    return data
  }

  async findItems(params) {
    const response = await mongoose.model(this.#collection, this.#schema).find({ code: params }).lean()
    if (response.length === 0) return null
    const data = this.parseResponse(response)
    return data
  }

  async createItem(item) {
    this.validateObject(item)
    try {
      const response = await mongoose.model(this.#collection, this.#schema).create(item)
      const data = this.parseResponse(response)
      return data
    } catch (err) {
      console.log(err)
    }
  }

  async updateItem(item) {
    this.validateObject(item)
    const data = await mongoose.model(this.#collection, this.#schema).updateOne((item))
    return data
  }

  async deleteItem(params) {
    await mongoose.model(this.#collection, this.#schema).deleteOne({ code: params })
  }
}

class ProductsDB extends databaseManager {
  constructor() {
    super('products', productSchema)
  }

  // async getProducts() {
  //   const products = await super.getItems()
  //   return products
  // }

  // async createProduct(item) {
  //   const product = await super.createItem(item)
  //   return product
  // }

  // async updateProduct(item) {
  //   const product = await super.updateItem(item)
  //   return product
  // }

  // async deleteProduct(itemID) {
  //   await super.deleteItem()
  // }
}

class CartsDB extends databaseManager {
  constructor() {
    super('products', cartSchema)
  }
}

class MessagesDB extends databaseManager {
  constructor() {
    super('products', messageSchema)
  }
}

const PM_MONGO = new ProductsDB()
const CM_MONGO = new CartsDB()
const MM_MONGO = new MessagesDB()

export { CM_MONGO, MM_MONGO, PM_MONGO }
