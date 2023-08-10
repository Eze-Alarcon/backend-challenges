// DAOs
import { DAO_PRODUCTS } from '../dao/products.database.js'

// Models
import { Product } from '../models/product.model.js'
import { CustomError } from '../models/error.model.js'

// Services
import { emailService } from './email.service.js'

// Joi
import { validation as validProduct } from '../schemas/joi/products.joi.schema.js'

// Error messages
import { PRODUCT_MANAGER_ERRORS } from '../utils/errors.messages.js'

class ProductService {
  #dao
  constructor ({ DAO }) {
    this.#dao = DAO
  }

  async getMany (options) {
    try {
      const products = await this.#dao.getMany(options)
      return { products }
    } catch (error) {
      throw new CustomError(PRODUCT_MANAGER_ERRORS.PRODUCT_NOT_FOUND)
    }
  }

  async getOne (query) {
    try {
      const product = await this.#dao.getOne(query)
      return { product: product[0] }
    } catch (error) {
      throw new CustomError(PRODUCT_MANAGER_ERRORS.PRODUCT_NOT_FOUND)
    }
  }

  async createOne (fields) {
    const { error, value: validFields } = validProduct({ data: fields })
    if (error !== undefined) CustomError.userError(error)

    try {
      const productModel = new Product({ ...validFields })
      const newProduct = await this.#dao.createOne(productModel.DTO())
      return { product: newProduct }
    } catch (error) {
      throw new CustomError(PRODUCT_MANAGER_ERRORS.PRODUCT_EXIST)
    }
  }

  async updateOne (query, fields) {
    try {
      const { product } = await this.getOne(query)

      const mappedFields = {
        description: fields.description ?? product.description,
        thumbnail: fields.thumbnail ?? product.thumbnail,
        title: fields.title ?? product.title,
        price: (!isNaN(parseFloat(fields.price))) ? parseFloat(fields.price) : product.price,
        stock: (!isNaN(parseInt(fields.stock))) ? parseInt(fields.stock) : product.stock
      }

      const { error, value: validFields } = validProduct({ data: mappedFields })

      if (error !== undefined) CustomError.userError(error)

      const newProduct = {
        ...product,
        ...validFields
      }

      await this.#dao.updateOne(query, newProduct)
      return { product_updated: newProduct }
    } catch (error) {
      throw new CustomError(PRODUCT_MANAGER_ERRORS.PRODUCT_NOT_FOUND)
    }
  }

  async deleteOne (query) {
    try {
      const { product } = await this.getOne(query)
      if (product.owner !== 'admin') {
        await emailService.send({ dest: product.owner, message: product.title, emailType: 'productDeleted' })
      }
      const itemDeleted = await this.#dao.deleteOne(query)

      return { product_deleted: itemDeleted }
    } catch (error) {
      throw new CustomError(PRODUCT_MANAGER_ERRORS.PRODUCT_NOT_FOUND)
    }
  }
}

const productService = new ProductService({ DAO: DAO_PRODUCTS })

export { productService, ProductService }
