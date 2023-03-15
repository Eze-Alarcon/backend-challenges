'use strict'

/* eslint space-before-function-paren: 0 */
import fs from 'fs/promises'
import { validateInputs, searchMatch } from '../logic/validations.js'
import { ERRORS, SUCCESS } from '../mocks/messages.js'
import { Products } from '../mocks/Products.js'
import { encryptID } from '../logic/cripto.js'
import { getMax } from '../logic/helpers.js'

class ProductManager {
  #path
  #lastID
  constructor(path) {
    this.#path = path
    this.productsList = []
    this.#lastID = 0
  }

  async reset() {
    await fs.writeFile(this.#path, '[]')
    this.productsList = []
  }

  async #writeData() {
    const json = JSON.stringify(this.productsList, null, 2)
    await fs.writeFile(this.#path, json)
  }

  async #loadData() {
    const rawData = await fs.readFile(this.#path, 'utf-8')
    if (rawData === '') {
      this.productsList = []
      return
    }
    const data = JSON.parse(rawData)
    this.productsList = [...data]
  }

  async #getIndex(productId) {
    await this.getProducts()

    const idToCompare = encryptID(productId)
    const productIndex = this.productsList.findIndex((item) => item.id === idToCompare)

    if (productIndex === -1) throw new Error(ERRORS.PRODUCT_NOT_FOUND.ERROR_CODE)

    return productIndex
  }

  async getProducts() {
    await this.#loadData()
    return this.productsList
  }

  async getProductById(productID) {
    const productIndex = await this.#getIndex(productID)
    const product = this.productsList[productIndex]
    return {
      status_code: SUCCESS.GET.STATUS,
      item: product
    }
  }

  async addProduct(fields) {
    const validate = await validateInputs(fields, { strict: true })
    if (validate.error) throw new Error(validate.status_code)

    await this.getProducts()

    const match = searchMatch(fields.code, this.productsList)
    if (match.error) throw new Error(match.status_code)

    this.#lastID = getMax(this.productsList)

    const newProduct = new Products(++this.#lastID, fields)
    this.productsList.push(newProduct)

    await this.#writeData()

    return {
      status_code: SUCCESS.CREATED.STATUS,
      productAdded: newProduct
    }
  }

  async updateProduct(productId, fields) {
    const productIndex = await this.#getIndex(productId)
    const product = this.productsList[productIndex]

    const validate = await validateInputs(fields, { strict: false })
    if (validate.error) throw new Error(validate.status_code)

    product.description = fields.description ?? product.description
    product.thumbnail = fields.thumbnail ?? product.thumbnail
    product.title = fields.title ?? product.title
    product.price = fields.price ?? product.price
    product.stock = fields.stock ?? product.stock

    await this.#writeData()
    return {
      status_code: SUCCESS.UPDATED.STATUS,
      itemUpdated: product
    }
  }

  async deleteProduct(productId) {
    const productIndex = await this.#getIndex(productId)

    const itemDeleted = this.productsList.splice(productIndex, 1)
    await this.#writeData()

    return {
      status_code: SUCCESS.DELETED.STATUS,
      itemDeleted
    }
  }
}

const PM = new ProductManager('./src/storage/products.json')

// En caso de que sea necesario generar de nuevo los productos

PM.reset()

for (let i = 1; i <= 10; i++) {
  await PM.addProduct({
    title: `producto ${i}`,
    description: `Este es el producto de prueba n°${i}`,
    price: i * 100,
    thumbnail: `Imagen ${i}`,
    code: `abc${i}`,
    stock: i
  })
}

export { PM }
