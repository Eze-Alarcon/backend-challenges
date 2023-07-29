import { faker } from '@faker-js/faker'
import { ProductService } from '../services/product.service.js'

// small dao to test service
class DAO_TEST {
  #parseResponse (item) {
    return JSON.parse(JSON.stringify(item))
  }

  async createOne (item) {
    const response = item
    const data = this.#parseResponse(response)
    return data
  }
}

const DAO = new DAO_TEST()

const mockProductService = new ProductService({ DAO })

async function createMockProducts () {
  const products = []
  for (let i = 0; i < 2; i++) {
    const fields = {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      thumbnail: [],
      price: faker.commerce.price(),
      stock: Math.ceil(Math.random() * 50)
    }
    const product = await mockProductService.createOne(fields)
    products.push(product)
    console.log(product)
  }
  return products
}

export { createMockProducts }
