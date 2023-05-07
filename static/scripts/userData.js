let flag = 0

class User {
  constructor ({
    email,
    age,
    first_name,
    last_name,
    role,
    cartID
  }) {
    this.email = email
    this.age = age
    this.first_name = first_name
    this.last_name = last_name
    this.role = role
    this.cartID = cartID

    if (typeof User.instance === 'object') {
      return User.instance
    }

    User.instance = this
    return this
  }
}

async function getUserData () {
  const data = await fetch()

  const user = data.json()
  // TODO: terminal el llamado a la db pero falta el tema de como obtener el email del usuario
  console.log(user)
}

if (flag === 0) {
  flag = 1
  getUserData()
}
