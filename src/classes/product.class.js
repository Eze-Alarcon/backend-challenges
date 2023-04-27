'use strict'
import crypto from 'crypto'
/* eslint space-before-function-paren: 0 */

export class Product {
  #id
  #title
  #description
  #category
  #price
  #status
  #thumbnail
  #stock
  #code

  constructor({
    id,
    title,
    description,
    category,
    price,
    code,
    status = true,
    stock = 0,
    thumbnail = []
  }) {
    this.#id = id
    this.#title = title
    this.#description = description
    this.#category = category
    this.#price = price
    this.#status = status
    this.#thumbnail = thumbnail
    this.#stock = stock
    this.#code = code ?? `code-${crypto.randomUUID()}`
  }

  getProductData() {
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      category: this.#category,
      price: this.#price,
      status: this.#status,
      thumbnail: this.#thumbnail,
      stock: this.#stock,
      code: this.#code
    }
  }
}
