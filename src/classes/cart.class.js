/* eslint-disable space-before-function-paren */

export class CartProducts {
  constructor({ id, quantity }) {
    this.productID = id
    this.quantity = quantity ?? 1
  }
}

export class Carts {
  constructor(id) {
    this.ref = id
    this.id = id
    this.products = []
  }
}
