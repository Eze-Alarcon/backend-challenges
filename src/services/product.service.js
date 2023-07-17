// DAOs
import { DB_PRODUCTS } from '../dao/products.database.js'

// Models
import { Product } from '../models/product.model.js'

// Utils
import { validateInputs } from '../utils/validations.js'
import { STATUS_CODE, PRODUCT_MANAGER_ERRORS } from '../utils/errors.messages.js'

class ProductManager {
  #nextID
  constructor () { this.#nextID = 0 }

  async getProducts (options = {}) {
    try {
      const products = await DB_PRODUCTS.getProducts(options)
      return {
        status_code: STATUS_CODE.SUCCESS.OK,
        products
      }
    } catch (error) {
      throw new Error(PRODUCT_MANAGER_ERRORS.NO_PRODUCTS_PARAMETERS.ERROR_CODE)
    }
  }

  async getProductById (query) {
    try {
      const product = await DB_PRODUCTS.findProducts(query)
      return {
        status_code: STATUS_CODE.SUCCESS.OK,
        item: product[0]
      }
    } catch (error) {
      throw new Error(PRODUCT_MANAGER_ERRORS.PRODUCT_NOT_FOUND.ERROR_CODE)
    }
  }

  async addProduct (fields) {
    try {
      const strictValidation = true
      validateInputs(fields, strictValidation)

      const lastItem = await DB_PRODUCTS.getLastProduct()

      lastItem.length > 0
        ? this.#nextID = ++lastItem[0].id
        : this.#nextID = 1

      const newProduct = new Product({ ...fields, id: this.#nextID })
      await DB_PRODUCTS.createProduct(newProduct.getProductData())

      return {
        status_code: STATUS_CODE.SUCCESS.CREATED,
        productAdded: newProduct
      }
    } catch (error) {
      throw new Error(PRODUCT_MANAGER_ERRORS.CREATE_PRODUCT.ERROR_CODE)
    }
  }

  async updateProduct (query, fields) {
    try {
      const { item } = await this.getProductById(query)

      validateInputs(fields)

      const newProduct = {
        ...item,
        description: fields.description ?? item.description,
        thumbnail: fields.thumbnail ?? item.thumbnail,
        category: fields.category ?? item.category,
        title: fields.title ?? item.title,
        price: fields.price ?? item.price,
        stock: fields.stock ?? item.stock
      }

      await DB_PRODUCTS.updateProduct(query, newProduct)
      return {
        status_code: STATUS_CODE.SUCCESS.OK,
        itemUpdated: newProduct
      }
    } catch (error) {
      throw new Error(PRODUCT_MANAGER_ERRORS.PRODUCT_NOT_FOUND.ERROR_CODE)
    }
  }

  async deleteProduct (query) {
    try {
      const itemDeleted = await DB_PRODUCTS.deleteProduct({ id: query })

      return {
        status_code: STATUS_CODE.SUCCESS.NO_CONTENT,
        itemDeleted
      }
    } catch (error) {
      throw new Error(PRODUCT_MANAGER_ERRORS.PRODUCT_NOT_FOUND.ERROR_CODE)
    }
  }
}

const productManager = new ProductManager()

export { productManager }
