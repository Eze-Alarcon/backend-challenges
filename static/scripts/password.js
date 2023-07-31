const loginForm = document.getElementById('setpassword_form')

const email = loginForm.dataset.email
loginForm.addEventListener('submit', handleSubmit)

async function handleSubmit (e) {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(e.target))
  await postData({ ...data, email })
}

async function postData (data) {
  const sendForm = await fetch(
    '/api/users/password',
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
  )
  console.log(sendForm)
  const response = await sendForm.json()
  console.log('response: ', response)
}
