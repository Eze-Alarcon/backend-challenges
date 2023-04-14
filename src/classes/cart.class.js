/* eslint-disable space-before-function-paren */

class CartProducts {
  constructor({ id, quantity }) {
    this.productID = id
    this.quantity = quantity ?? 1
  }
}

class Carts {
  constructor({ id }) {
    this.id = id
    this.products = []
  }
}

export { CartProducts, Carts }
