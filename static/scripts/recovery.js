const loginForm = document.getElementById('recovery_form')

loginForm.addEventListener('submit', handleSubmit)

async function handleSubmit (e) {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(e.target))
  await postData(data)
}

async function postData (data) {
  const sendForm = await fetch(
    '/api/sessions/recovery',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  const response = await sendForm.json()
  console.log(response)
}