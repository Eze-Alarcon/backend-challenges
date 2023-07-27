// Utils
import { generateID } from '../utils/hash.js'

export class Product {
  #id
  #title
  #description
  #price
  #status
  #thumbnail
  #stock
  #code

  constructor ({
    id,
    title,
    description,
    price,
    status = true,
    stock = 0,
    thumbnail = []
  }) {
    this.#id = id
    this.#title = title
    this.#description = description
    this.#price = price
    this.#status = status
    this.#thumbnail = thumbnail
    this.#stock = stock
    this.#code = generateID()
  }

  DTO () {
    return {
      id: this.#id,
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
