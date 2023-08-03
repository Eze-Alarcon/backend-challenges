// Utils
import { generateID } from '../utils/hash.js'

class Cart {
  #code
  #products
  #cartOwner

  constructor ({ email }) {
    this.#code = generateID()
    this.#products = []
    this.#cartOwner = email
  }

  DTO () {
    return {
      code: this.#code,
      products: this.#products,
      cartOwner: this.#cartOwner
    }
  }
}

export { Cart }
