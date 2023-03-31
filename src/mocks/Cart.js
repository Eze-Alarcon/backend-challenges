'use strict'

/* eslint space-before-function-paren: 0 */
import { encryptID } from '../logic/cripto.js'

export class CartProducts {
  constructor({ id, quantity }
  ) {
    this.productRef = id
    this.quantity = quantity ?? 1
  }
}

export class Carts {
  constructor(lastID) {
    this.ref = lastID
    this.id = encryptID(lastID)
    this.products = []
  }
}
