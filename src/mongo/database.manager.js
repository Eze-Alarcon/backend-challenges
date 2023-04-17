/* eslint-disable space-before-function-paren */
import { productModel } from './models/products.schema.js'
import { cartModel } from './models/cart.schema.js'
import { ERRORS } from '../helpers/errors.messages.js'
import mongoose from 'mongoose'
import { SERVER_CONFIG } from '../config/server.config.js'

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
    const pageQuery = {
      price: { $gte: 0 }
    }

    for (const [key, value] of Object.entries(options)) {
      if (key === 'minPrice') pageQuery.price.$gte = parseInt(value)

      // encuentra la propiedad por la cual el usuario quiere filtrar
      if (key !== 'limit' &&
        key !== 'page' &&
        key !== 'sort' &&
        key !== 'minPrice'
      ) pageQuery[key] = value

      // si aplica un sort, revisa si el sort es ascendente o descendente
      if (key === 'sort' && (value === 'asc' || value === 1)) {
        pageOptions.sort.price = 'ascending'
      } else if (key === 'sort' && (value === 'desc' || value === -1)) {
        pageOptions.sort.price = 'descending'
      }
    }

    return { pageOptions, pageQuery }
  }

  #generateLinks(options, data) {
    const links = {
      prevLink: null,
      nextLink: null
    }

    if (data.hasPrevPage) {
      const newOptions = {
        ...options,
        page: data.prevPage
      }
      const newParams = new URLSearchParams([
        ...Object.entries(newOptions)
      ]).toString()

      links.prevLink = `${SERVER_CONFIG.BASE_URL}${SERVER_CONFIG.PRODUCTS_ROUTE}?${newParams}`
    }

    if (data.hasNextPage) {
      const newOptions = {
        ...options,
        page: data.nextPage
      }
      const newParams = new URLSearchParams([
        ...Object.entries(newOptions)
      ]).toString()

      links.nextLink = `${SERVER_CONFIG.BASE_URL}${SERVER_CONFIG.PRODUCTS_ROUTE}?${newParams}`
    }
    return links
  }

  async getProducts(options) {
    try {
      const { pageOptions, pageQuery } = this.#handleQueries(options)

      const data = await this.#model.paginate(pageQuery, pageOptions)
      if (data.docs.length < 1) throw new Error()

      // Genero los links de la paginas anterios y siguiente
      const links = this.#generateLinks(options, data)

      return {
        payload: data.docs,
        status: data.status_code,
        totalPages: data.totalPages,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        page: data.page,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage,
        prevLink: links.prevLink,
        nextLink: links.nextLink
      }
    } catch (err) {
      throw new Error(ERRORS.NO_PRODUCTS_PARAMETERS.ERROR_CODE)
    }
  }

  async findProducts(query) {
    try {
      const response = await this.#model.find(query).lean()
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
    console.log(id)
    const response = await this.#model
      .find(
        { id },
        { _id: 0, products: { _id: 0 } })
      .populate(
        {
          path: 'products.product.id',
          select: '-_id -stock'
        })
      .lean()

    if (response.length === 0) throw new Error(ERRORS.CART_NOT_FOUND.ERROR_CODE)
    return response[0]
  }

  async createCart(item) {
    const response = await this.#model.create(item)
    const data = this.#parseResponse(response)
    return data
  }

  async addProductToCart({ id, productID }) {
    const data = await this.#model.updateOne(
      { id },
      {
        $push:
        {
          products:
          {
            product: {
              id: new mongoose.Types.ObjectId(productID),
              quantity: 1
            }
          }
        }
      }
    )
    return {
      ...data,
      productAdded: true,
      productModified: false,
      quantityValue: 1
    }
  }

  async updateCartProductQuantity({ cartID, productID, quantity }) {
    const data = await this.#model.updateOne(
      { cartID, 'products.product.id': productID },
      { $set: { 'products.$[elem].product.quantity': quantity } },
      { arrayFilters: [{ 'elem.product.id': productID }] }
    )
    const dataWasModified = data.modifiedCount > 0

    return {
      productAdded: false,
      productModified: dataWasModified,
      quantityValue: quantity
    }
  }

  async deleteAllCartProducts({ id }) {
    const response = await this.#model.updateOne(
      { id },
      { $set: { products: [] } }
    )
    return response
  }

  async deleteCartProduct({ id, productID }) {
    const data = await this.#model.updateOne(
      { id },
      { $pull: { products: { 'product.id': productID } } }
    )
    const dataWasModified = data.modifiedCount > 0
    return {
      productRemoved: dataWasModified
    }
  }
}

const DB_PRODUCTS = new DB_PRODUCT_MANAGER(productModel)
const DB_CARTS = new DB_CART_MANAGER(cartModel)

export { DB_CARTS, DB_PRODUCTS }
