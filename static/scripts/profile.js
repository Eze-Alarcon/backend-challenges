const btnLogout = document.getElementById('btn_logout')
const btnUptRole = document.getElementById('btn_update_role')
const liRole = document.getElementById('li-role')

const TEXTS = {
  BTN_USER: 'Upgrade to premium',
  BTN_PREMIUM: 'Downgrade to user',
  LI_USER: 'Acess: User',
  LI_PREMIUM: 'Acess: Premium'
}

btnLogout.addEventListener('click', logout)
btnUptRole.addEventListener('click', updateRole)

async function logout (event) {
  event.preventDefault()
  await fetch('/api/sessions/logout', { method: 'DELETE' })
  window.location.assign('/')
}

async function updateRole (event) {
  event.preventDefault()
  await fetch('/api/users/premium', { method: 'PUT' })

  if (event.srcElement.dataset.role === 'user') {
    event.srcElement.dataset.role = 'premium'
    event.srcElement.innerText = TEXTS.BTN_PREMIUM
    liRole.innerText = TEXTS.LI_PREMIUM
    liRole.classList.add('active')
  } else {
    event.srcElement.dataset.role = 'user'
    event.srcElement.innerText = TEXTS.BTN_USER
    liRole.innerText = TEXTS.LI_USER
    liRole.classList.remove('active')
  }
}
