/* eslint space-before-function-paren: 0 */
import { encryptID } from '../logic/cripto'

export class CartProducts {
  constructor({ id, quantity }
  ) {
    this.productRef = id
    this.quantity = quantity
  }
}

export class Carts {
  constructor(lastID) {
    this.ref = lastID
    this.id = encryptID(lastID)
    this.products = []
  }
}
