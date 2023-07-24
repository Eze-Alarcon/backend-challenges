import { faker } from '@faker-js/faker'
import { ProductService } from '../services/product.service.js'

// small dao to test service
class DAO_TEST {
  #lastID = 0

  #parseResponse (item) {
    return JSON.parse(JSON.stringify(item))
  }

  async getLastID () {
    const x = new Promise((resolve) => {
      resolve()
    })
      .then(() => {
        this.#lastID > 0
          ? this.#lastID = ++this.#lastID
          : this.#lastID = 1
      })
    await x
    return this.#lastID
  }

  async createProduct (item) {
    const response = item
    const data = this.#parseResponse(response)
    return data
  }
}

const DAO = new DAO_TEST()

const mockProductService = new ProductService({ DAO })

for (let i = 0; i < 50; i++) {
  const fields = {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    thumbnail: [],
    price: faker.commerce.price(),
    stock: Math.ceil(Math.random() * 50)
  }
  const product = await mockProductService.addProduct(fields)
  console.log(product)
}
