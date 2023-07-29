// Utils
import { generateID } from '../utils/hash.js'

class Cart {
  #code
  #products

  constructor () {
    this.#code = generateID()
    this.#products = []
  }

  DTO () {
    return {
      code: this.#code,
      products: this.#products
    }
  }
}

export { Cart }
