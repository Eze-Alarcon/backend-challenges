'use strict'
import crypto from 'crypto'
/* eslint space-before-function-paren: 0 */

export class Product {
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
    this.id = id
    this.title = title
    this.description = description
    this.category = category
    this.price = price
    this.status = status
    this.thumbnail = thumbnail
    this.stock = stock
    this.code = code ?? `code-${crypto.randomUUID()}`
  }
}
