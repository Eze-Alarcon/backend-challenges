/* eslint space-before-function-paren: 0 */
import { createID, genCode } from '../logic/cripto.js'

export class Products {
  constructor({
    title,
    description,
    price,
    thumbnail,
    code,
    stock = 0
  }) {
    this.id = createID()
    this.title = title
    this.description = description
    this.price = price
    this.thumbnail = thumbnail
    this.stock = stock
    this.code = code ?? `product-${genCode()}`
  }
}
