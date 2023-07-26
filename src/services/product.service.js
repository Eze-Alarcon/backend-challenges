// DAOs
import { DAO_PRODUCTS } from '../dao/products.database.js'

// Models
import { Product } from '../models/product.model.js'
import { CustomError } from '../models/error.model.js'

// Joi
import { validation as validProduct } from '../schemas/joi/products.joi.schema.js'

// Error messages
import {
  STATUS_CODE,
  PRODUCT_MANAGER_ERRORS
} from '../utils/errors.messages.js'

class ProductService {
  #nextID
  #dao
  constructor ({ DAO }) {
    this.#nextID = 0
    this.#dao = DAO
  }

  async getProducts (options = {}) {
    try {
      const products = await this.#dao.getProducts(options)
      return {
        status_code: STATUS_CODE.SUCCESS.OK,
        products
      }
    } catch (error) {
      throw new CustomError(PRODUCT_MANAGER_ERRORS.PRODUCT_NOT_FOUND)
    }
  }

  async getProductById (query) {
    try {
      const product = await this.#dao.findProducts(query)
      return {
        status_code: STATUS_CODE.SUCCESS.OK,
        item: product[0]
      }
    } catch (error) {
      throw new CustomError(PRODUCT_MANAGER_ERRORS.PRODUCT_NOT_FOUND)
    }
  }

  async addProduct (fields) {
    const mappedFields = {
      description: fields.description,
      thumbnail: fields.thumbnail ?? [],
      title: fields.title,
      price: parseFloat(fields.price),
      stock: parseInt(fields.stock)
    }

    const { error, value: validFields } = validProduct({ data: mappedFields })

    if (error !== undefined) CustomError.userError(error)

    try {
      this.#nextID = await this.#dao.getLastID()

      const newProduct = new Product({ ...validFields, id: this.#nextID })
      await this.#dao.createProduct(newProduct.DTO())
      return {
        status_code: STATUS_CODE.SUCCESS.CREATED,
        productAdded: newProduct.DTO()
      }
    } catch (error) {
      throw new CustomError(PRODUCT_MANAGER_ERRORS.PRODUCT_EXIST)
    }
  }

  async updateProduct (query, fields) {
    try {
      const { item } = await this.getProductById(query)

      const mappedFields = {
        description: fields.description ?? item.description,
        thumbnail: fields.thumbnail ?? item.thumbnail,
        title: fields.title ?? item.title,
        price: (!isNaN(parseFloat(fields.price))) ? parseFloat(fields.price) : item.price,
        stock: (!isNaN(parseInt(fields.stock))) ? parseInt(fields.stock) : item.stock
      }

      const { error, value: validFields } = validProduct({ data: mappedFields })

      if (error !== undefined) CustomError.userError(error)

      const newProduct = {
        ...item,
        ...validFields
      }

      await this.#dao.updateProduct(query, newProduct)
      return {
        status_code: STATUS_CODE.SUCCESS.OK,
        itemUpdated: newProduct
      }
    } catch (error) {
      throw new CustomError(PRODUCT_MANAGER_ERRORS.PRODUCT_NOT_FOUND)
    }
  }

  async deleteProduct (query) {
    try {
      const itemDeleted = await this.#dao.deleteProduct({ id: query })

      return {
        status_code: STATUS_CODE.SUCCESS.NO_CONTENT,
        itemDeleted
      }
    } catch (error) {
      throw new CustomError(PRODUCT_MANAGER_ERRORS.PRODUCT_NOT_FOUND)
    }
  }
}

const productService = new ProductService({ DAO: DAO_PRODUCTS })

export { productService, ProductService }
