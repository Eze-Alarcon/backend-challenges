/* eslint-disable camelcase */
/* eslint space-before-function-paren: 0 */

export class User {
  #email
  #password
  #first_name
  #last_name
  #age
  constructor({
    email,
    password,
    first_name,
    last_name,
    age
  }) {
    this.#email = email
    this.#password = password
    this.#first_name = first_name
    this.#last_name = last_name
    this.#age = age
  }

  getData() {
    return {
      email: this.#email,
      password: this.#password,
      first_name: this.#first_name,
      last_name: this.#last_name,
      age: this.#age
    }
  }

  getPublicData() {
    return {
      email: this.#email,
      name: `${this.#first_name} ${this.#last_name}`,
      age: this.#age
    }
  }
}
