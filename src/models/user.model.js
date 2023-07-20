// Constans
import { ROLES } from '../utils/contans.js'

class User {
  #email
  #cartID
  #role

  constructor ({
    email,
    cartID,
    role
  }) {
    this.#email = email
    this.#cartID = cartID
    this.#role = role
  }

  getUser () {
    return {
      email: this.#email,
      cartID: this.#cartID,
      role: this.#role
    }
  }
}

class UserPassport extends User {
  #password
  #first_name
  #last_name
  #age
  constructor ({
    email,
    cartID = null,
    role = ROLES.USER,
    password,
    first_name,
    last_name,
    age
  }) {
    super({ email, cartID, role })
    this.#first_name = first_name
    this.#last_name = last_name
    this.#age = age
    this.#password = password
  }

  getUser () {
    const userData = super.getUser()
    return {
      ...userData,
      first_name: this.#first_name,
      last_name: this.#last_name,
      age: this.#age,
      password: this.#password
    }
  }

  getPublicData () {
    const userData = super.getUser()
    return {
      ...userData,
      first_name: this.#first_name,
      last_name: this.#last_name,
      age: this.#age
    }
  }
}

class UserGithub extends User {
  constructor ({
    email,
    cartID,
    role = ROLES.USER
  }) {
    super({ email, cartID, role })
  }

  getUserGithub () {
    const userData = super.getUser()
    return { ...userData }
  }
}

export {
  ROLES,
  UserPassport,
  UserGithub
}
