// Utils
import { generateID } from '../utils/hash.js'

export class Product {
  #title
  #description
  #price
  #status
  #thumbnail
  #stock
  #code

  constructor ({
    title,
    description,
    price,
    status = true,
    stock = 0,
    thumbnail = []
  }) {
    this.#code = generateID()
    this.#title = title
    this.#description = description
    this.#price = price
    this.#status = status
    this.#thumbnail = thumbnail
    this.#stock = stock
  }

  DTO () {
    return {
      title: this.#title,
      description: this.#description,
      price: this.#price,
      status: this.#status,
      thumbnail: this.#thumbnail,
      stock: this.#stock,
      code: this.#code
    }
  }
}
