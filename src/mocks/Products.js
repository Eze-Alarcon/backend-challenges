/* eslint space-before-function-paren: 0 */
import { encryptId } from '../logic/cripto.js'

export class Products {
  #idValue
  constructor(
    lastID,
    {
      title,
      description,
      price,
      thumbnail,
      code,
      stock = 0
    }
  ) {
    this.ref = lastID
    this.id = encryptId(lastID)
    this.title = title
    this.description = description
    this.price = price
    this.thumbnail = thumbnail
    this.stock = stock
    this.code = code ?? `code-${this.lastID}`
  }
}
