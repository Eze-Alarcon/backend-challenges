// DAOs
import { DAO_PRODUCTS } from '../dao/products.database.js'

// Models
import { Product } from '../models/product.model.js'
import { CustomError } from '../models/error.model.js'

// Joi
import { validation } from '../schemas/joi/products.joi.schema.js'

// Error messages
import {
  STATUS_CODE,
  PRODUCT_MANAGER_ERRORS,
  JOI_ERRORS
} from '../utils/errors.messages.js'

class ProductService {
  #nextID
  constructor () { this.#nextID = 0 }

  async getProducts (options = {}) {
    try {
      const products = await DAO_PRODUCTS.getProducts(options)
      return {
        status_code: STATUS_CODE.SUCCESS.OK,
        products
      }
    } catch (error) {
      throw new CustomError({
        status: PRODUCT_MANAGER_ERRORS.PRODUCT_NOT_FOUND.STATUS,
        type: PRODUCT_MANAGER_ERRORS.PRODUCT_NOT_FOUND.TYPE,
        cause: PRODUCT_MANAGER_ERRORS.PRODUCT_NOT_FOUND.MESSAGE
      })
    }
  }

  async getProductById (query) {
    try {
      const product = await DAO_PRODUCTS.findProducts(query)
      return {
        status_code: STATUS_CODE.SUCCESS.OK,
        item: product[0]
      }
    } catch (error) {
      throw new CustomError({
        status: PRODUCT_MANAGER_ERRORS.PRODUCT_NOT_FOUND.STATUS,
        type: PRODUCT_MANAGER_ERRORS.PRODUCT_NOT_FOUND.TYPE,
        cause: PRODUCT_MANAGER_ERRORS.PRODUCT_NOT_FOUND.MESSAGE
      })
    }
  }

  async addProduct (fields) {
    try {
      const mappedFields = {
        description: fields.description,
        thumbnail: fields.thumbnail ?? [],
        title: fields.title,
        price: parseFloat(fields.price),
        stock: parseInt(fields.stock)
      }

      const { error, value: validFields } = validation({ data: mappedFields })

      if (error !== undefined) {
        throw new CustomError({
          status: JOI_ERRORS.STATUS,
          type: JOI_ERRORS.TYPE,
          cause: error
        })
      }

      const lastItem = await DAO_PRODUCTS.getLastProduct()

      lastItem.length > 0
        ? this.#nextID = ++lastItem[0].id
        : this.#nextID = 1

      const newProduct = new Product({ ...validFields, id: this.#nextID })
      await DAO_PRODUCTS.createProduct(newProduct.getProductData())

      return {
        status_code: STATUS_CODE.SUCCESS.CREATED,
        productAdded: newProduct
      }
    } catch (error) {
      throw new CustomError({
        status: PRODUCT_MANAGER_ERRORS.CREATE_PRODUCT.STATUS,
        type: PRODUCT_MANAGER_ERRORS.CREATE_PRODUCT.TYPE,
        cause: PRODUCT_MANAGER_ERRORS.CREATE_PRODUCT.MESSAGE
      })
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

      const { error, value: validFields } = validation({ data: mappedFields })

      if (error !== undefined) {
        throw new CustomError({
          status: JOI_ERRORS.STATUS,
          type: JOI_ERRORS.TYPE,
          cause: error
        })
      }

      const newProduct = {
        ...item,
        ...validFields
      }

      await DAO_PRODUCTS.updateProduct(query, newProduct)
      return {
        status_code: STATUS_CODE.SUCCESS.OK,
        itemUpdated: newProduct
      }
    } catch (error) {
      console.log(error)
      throw new CustomError({
        status: PRODUCT_MANAGER_ERRORS.PRODUCT_NOT_FOUND.STATUS,
        type: PRODUCT_MANAGER_ERRORS.PRODUCT_NOT_FOUND.TYPE,
        cause: PRODUCT_MANAGER_ERRORS.PRODUCT_NOT_FOUND.MESSAGE
      })
    }
  }

  async deleteProduct (query) {
    try {
      const itemDeleted = await DAO_PRODUCTS.deleteProduct({ id: query })

      return {
        status_code: STATUS_CODE.SUCCESS.NO_CONTENT,
        itemDeleted
      }
    } catch (error) {
      throw new CustomError({
        status: PRODUCT_MANAGER_ERRORS.PRODUCT_NOT_FOUND.STATUS,
        type: PRODUCT_MANAGER_ERRORS.PRODUCT_NOT_FOUND.TYPE,
        cause: PRODUCT_MANAGER_ERRORS.PRODUCT_NOT_FOUND.MESSAGE
      })
    }
  }
}

const productService = new ProductService()

export { productService }
