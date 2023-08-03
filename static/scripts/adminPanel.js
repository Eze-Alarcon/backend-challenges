const ROLES = {
  USER: 'user',
  PREMIUM: 'premium'
}

// eslint-disable-next-line no-unused-vars
async function updateUserRole (event, email, role) {
  const btnUpdate = event.currentTarget
  btnUpdate.disabled = true
  await fetch('http://localhost:8080/api/users/user',
    {
      method: 'PUT',
      body: JSON.stringify({ email, role }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    }
  )
  btnUpdate.disabled = false
  const liText = btnUpdate.offsetParent.children[0].innerText.split(' - ')
  const newUserRole = liText[0] === ROLES.USER ? ROLES.PREMIUM : ROLES.USER
  liText.shift()
  liText.unshift(newUserRole)
  btnUpdate.offsetParent.children[0].innerText = liText.join(' - ')
}
