'use strict'

/* eslint space-before-function-paren: 0 */

export class Product {
  constructor({
    id,
    title,
    description,
    price,
    code,
    status = true,
    stock = 0,
    thumbnail = []
  }) {
    this.id = id
    this.title = title
    this.description = description
    this.price = price
    this.status = status
    this.thumbnail = thumbnail
    this.stock = stock
    this.code = code ?? `code-${this.id}`
  }
}
