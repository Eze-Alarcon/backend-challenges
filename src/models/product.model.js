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
  #owner

  constructor ({
    title,
    description,
    price,
    status = true,
    stock = 0,
    thumbnail = [],
    owner = 'admin'
  }) {
    this.#code = generateID()
    this.#title = title
    this.#description = description
    this.#price = price
    this.#status = status
    this.#thumbnail = thumbnail
    this.#stock = stock
    this.#owner = owner
  }

  DTO () {
    return {
      title: this.#title,
      description: this.#description,
      price: this.#price,
      status: this.#status,
      thumbnail: this.#thumbnail,
      stock: this.#stock,
      code: this.#code,
      owner: this.#owner
    }
  }
}
