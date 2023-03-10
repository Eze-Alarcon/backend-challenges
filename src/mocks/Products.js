/* eslint space-before-function-paren: 0 */
import { encryptID } from '../logic/cripto.js'

export class Products {
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
    this.id = encryptID(lastID)
    this.title = title
    this.description = description
    this.price = price
    this.thumbnail = thumbnail
    this.stock = stock
    this.code = code ?? `code-${this.lastID}`
  }
}
