// Utils
import { generateID } from '../utils/hash.js'

class Ticket {
  #code
  #purchase_datetime
  #amount
  #purchaser

  constructor ({
    amount,
    purchaser
  }) {
    this.#code = generateID()
    this.#purchase_datetime = new Intl.DateTimeFormat('en', { dateStyle: 'full', timeStyle: 'long' }).format()
    this.#amount = amount
    this.#purchaser = purchaser
  }

  DTO () {
    return {
      code: this.#code,
      amount: this.#amount,
      purchaser: this.#purchaser,
      purchase_datetime: this.#purchase_datetime
    }
  }
}

export { Ticket }
