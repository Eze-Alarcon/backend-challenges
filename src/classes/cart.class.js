class Cart {
  #id
  #products

  constructor ({ id }) {
    this.#id = id
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
