/* eslint space-before-function-paren: 0 */
import { encryptId, genCode } from '../logic/cripto.js'

export class Products {
  #generateCode = `${genCode()}`
  constructor({
    title,
    description,
    price,
    thumbnail,
    code,
    stock = 0
  }) {
    this.id = encryptId(this.#generateCode)
    this.title = title
    this.description = description
    this.price = price
    this.thumbnail = thumbnail
    this.stock = stock
    this.code = code ?? `code-${this.#generateCode}`
  }
}
