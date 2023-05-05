
const ROLES = {
  USER: 'user',
  ADMIN: 'admin'
}

class GeneralUser {
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

class UserPassport extends GeneralUser {
  constructor ({
    email,
    cartID,
    role = ROLES.USER,
    password,
    first_name,
    last_name,
    age
  }) {
    super({ email, cartID, role })
    this.first_name = first_name
    this.last_name = last_name
    this.age = age
    this.password = password
  }

  getUserPassport () {
    const sensitiveData = super.getUser()
    return {
      ...sensitiveData,
      first_name: this.first_name,
      last_name: this.last_name,
      age: this.age,
      password: this.password
    }
  }
}

class UserGithub2 extends GeneralUser {
  constructor ({
    email,
    cartID,
    role = ROLES.USER
  }) {
    super({ email, cartID, role })
  }

  getUserGithub () {
    const sensitiveData = super.getUser()
    return { ...sensitiveData }
  }
}

class User {
  #email
  #password
  #first_name
  #last_name
  #age
  constructor ({
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

  getData () {
    return {
      email: this.#email,
      password: this.#password,
      first_name: this.#first_name,
      last_name: this.#last_name,
      age: this.#age
    }
  }

  getPublicData () {
    return {
      email: this.#email,
      name: `${this.#first_name} ${this.#last_name}`,
      age: this.#age
    }
  }
}

class UserGithub {
  #email
  constructor ({ email }) {
    this.#email = email
  }

  getData () {
    return { email: this.#email }
  }
}

export {
  ROLES,
  UserPassport,
  UserGithub2,
  User,
  UserGithub
}
