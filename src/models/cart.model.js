// Utils
import { generateID } from '../utils/hash.js'

class Cart {
  #id
  #products

  constructor () {
    this.#id = generateID()
    this.#products = []
  }

  getCartData () {
    return {
      id: this.#id,
      products: this.#products
    }
  }
}

export { Cart }
