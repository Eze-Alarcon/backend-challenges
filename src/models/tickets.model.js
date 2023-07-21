import crypto from 'crypto'

class Ticket {
  #id
  #code
  #purchase_datetime
  #amount
  #purchaser

  constructor ({
    id,
    amount,
    purchaser
  }) {
    this.#id = id
    this.#code = crypto.randomUUID()
    this.#purchase_datetime = new Intl.DateTimeFormat('en', { dateStyle: 'full', timeStyle: 'long' }).format()
    this.#amount = amount
    this.#purchaser = purchaser
  }

  DTO () {
    return {
      id: this.#id,
      code: this.#code,
      amount: this.#amount,
      purchaser: this.#purchaser,
      purchase_datetime: this.#purchase_datetime
    }
  }
}

export { Ticket }
