class Ticket {
  #Id
  #code
  #purchase_datetime
  #amount
  #purchaser

  constructor ({
    Id,
    code,
    purchase_datetime,
    amount,
    purchaser
  }) {
    this.#Id = Id
    this.#code = code
    this.#purchase_datetime = purchase_datetime
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
