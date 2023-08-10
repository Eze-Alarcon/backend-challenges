// Error messages
import { STATUS_CODE } from '../utils/errors.messages.js'

// Schemas
import { productModel } from '../schemas/mongoose/products.schema.js'

class DB_PRODUCT_MANAGER {
  #model
  constructor (model) {
    this.#model = model
  }

  #toPOJO (item) {
    return JSON.parse(JSON.stringify(item))
  }

  #handleQueries (options) {
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

  async getMany (options) {
    const { pageOptions, pageQuery } = this.#handleQueries(options)

    const data = await this.#model.paginate(pageQuery, pageOptions)

    return {
      payload: data.docs,
      status: STATUS_CODE.SUCCESS.OK,
      totalPages: data.totalPages,
      prevPage: data.prevPage,
      nextPage: data.nextPage,
      page: data.page,
      hasPrevPage: data.hasPrevPage,
      hasNextPage: data.hasNextPage
    }
  }

  async getOne (query) {
    const response = await this.#model.find(query).lean()
    return response
  }

  async createOne (item) {
    try {
      const response = await this.#model.create(item)
      const data = this.#toPOJO(response)
      return data
    } catch (error) {
      throw new Error()
    }
  }

  async updateOne (query, updates) {
    const data = await this.#model.updateOne(query, updates)
    return data
  }

  async deleteOne (query) {
    const response = await this.#model.deleteOne(query)
    return response
  }
}

const DAO_PRODUCTS = new DB_PRODUCT_MANAGER(productModel)

export { DAO_PRODUCTS }
