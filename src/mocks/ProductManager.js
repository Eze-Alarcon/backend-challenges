/* eslint space-before-function-paren: 0 */
import fs from 'fs/promises'
import { validateInputs, searchMatch } from '../logic/validations.js'
import { ERRORS, SUCCESS } from '../mocks/messages.js'
import { Products } from '../mocks/Products.js'
import { encryptId } from '../logic/cripto.js'

class ProductManager {
  #path
  constructor(path) {
    this.#path = path
    this.productsList = []
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

  async getProducts() {
    await this.#loadData()
    return this.productsList
  }

  async getProductById(productId) {
    await this.getProducts()
    const idToCompare = encryptId(productId)
    const product = this.productsList.find((item) => item.id === idToCompare)
    if (product === undefined) {
      throw new Error(ERRORS.NOT_FOUND.code)
    }
    return {
      log: SUCCESS.GET,
      item: product
    }
  }

  async addProduct(fields) {
    const validate = await validateInputs(fields, { strict: true })
    if (validate.error) return validate

    await this.getProducts()

    const match = searchMatch(fields.code, this.productsList)
    if (match.error) return match.log

    const newProduct = new Products(fields)
    this.productsList.push(newProduct)

    await this.#writeData()

    return {
      log: SUCCESS.CREATED,
      productAdded: newProduct
    }
  }

  async updateProduct(productId, fields) {
    const product = await this.getProductById(productId)
    if (product.error) return product.log

    const validate = await validateInputs(fields, { strict: false })
    if (validate.error) return validate.log

    const {
      title,
      description,
      price,
      thumbnail,
      stock
    } = fields

    product.item.description = description ?? product.item.description
    product.item.thumbnail = thumbnail ?? product.item.thumbnail
    product.item.title = title ?? product.item.title
    product.item.price = price ?? product.item.price
    product.item.stock = stock ?? product.item.stock

    await this.#writeData()
    return {
      log: SUCCESS.UPDATED,
      itemUpdated: product.item
    }
  }

  async deleteProduct(productId) {
    await this.getProducts()
    const productIndex = this.productsList.findIndex((item) => item.id === productId)
    if (productIndex === -1) return ERRORS.NOT_FOUND

    const itemDeleted = this.productsList.splice(productIndex, 1)
    await this.#writeData()

    return {
      log: SUCCESS.DELETED,
      itemDeleted
    }
  }
}

const PM = new ProductManager('./src/storage/products.json')

// En caso de que sea necesario generar de nuevo los productos

// PM.reset()

// for (let i = 1; i <= 10; i++) {
//   await PM.addProduct({
//     title: `producto ${i}`,
//     description: 'Este es un producto de prueba',
//     price: i * 100,
//     thumbnail: `Imagen ${i}`,
//     code: `abc${i}`,
//     stock: i
//   })
// }

export { PM }
