import crypto from 'crypto'

class Ticket {
  #Id
  #code
  #purchase_datetime
  #amount
  #purchaser

  constructor ({
    amount,
    purchaser
  }) {
    this.#code = crypto.randomUUID()
    this.#purchase_datetime = new Intl.DateTimeFormat('en', { dateStyle: 'full', timeStyle: 'long' }).format()
    this.#amount = amount
    this.#purchaser = purchaser
  }

  DTO () {
    return {
      Id: this.#Id,
      code: this.#code,
      amount: this.#amount,
      purchaser: this.#purchaser,
      purchase_datetime: this.#purchase_datetime
    }
  }
}

export { Ticket }
