/* eslint-disable space-before-function-paren */

import { SERVER } from '../../config/server.config.js'
import { STATUS_CODE } from '../../helpers/errors.messages.js'
import { productModel } from '../models/products.schema.js'

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
      projection: { _id: 0 },
      lean: true
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
      if (key === 'sort' && (value === 'asc' || value === '1')) {
        pageOptions.sort.price = 'ascending'
      } else if (key === 'sort' && (value === 'desc' || value === '-1')) {
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

      links.prevLink = `${SERVER.BASE_URL}/?${newParams}`
    }

    if (data.hasNextPage) {
      const newOptions = {
        ...options,
        page: data.nextPage
      }
      const newParams = new URLSearchParams([
        ...Object.entries(newOptions)
      ]).toString()

      links.nextLink = `${SERVER.BASE_URL}/?${newParams}`
    }
    return links
  }

  async getProducts(options) {
    const { pageOptions, pageQuery } = this.#handleQueries(options)

    const data = await this.#model.paginate(pageQuery, pageOptions)
    if (data.docs.length < 1) throw new Error()

    // Genero los links de la paginas anterios y siguiente
    const links = this.#generateLinks(options, data)

    return {
      payload: data.docs,
      status: STATUS_CODE.SUCCESS.OK,
      totalPages: data.totalPages,
      prevPage: data.prevPage,
      nextPage: data.nextPage,
      page: data.page,
      hasPrevPage: data.hasPrevPage,
      hasNextPage: data.hasNextPage,
      prevLink: links.prevLink,
      nextLink: links.nextLink
    }
  }

  async getLastProduct() {
    const data = await this.#model.paginate({}, {
      limit: 1,
      sort: { id: -1 },
      projection: { _id: 0 },
      lean: true
    })
    return data.docs
  }

  async findProducts(query) {
    const response = await this.#model.find(query).lean()
    return response
  }

  async createProduct(item) {
    const response = await this.#model.create(item)
    const data = this.#parseResponse(response)
    return data
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

const DB_PRODUCTS = new DB_PRODUCT_MANAGER(productModel)

export { DB_PRODUCTS }
