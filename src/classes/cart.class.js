/* eslint-disable space-before-function-paren */

class CartProduct {
  constructor({ id, quantity }) {
    this.id = id
    this.quantity = quantity ?? 1
  }
}

class Cart {
  constructor({ id }) {
    this.id = id
    this.products = []
  }
}

export { CartProduct, Cart }
