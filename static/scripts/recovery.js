const toastElement = document.getElementById('liveToast')
const toastBodyMessage = document.getElementById('toast-body-message')

let toast
if (toastElement) {
  // eslint-disable-next-line no-undef
  toast = bootstrap.Toast.getOrCreateInstance(toastElement)
}

function useToast (message) {
  toast.show()
  setTimeout(() => toast.hide(), 3000)
  toastBodyMessage.innerText = message
  // setTimeout(() => window.location.assign('/login'), 3000)
}

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
  useToast(response.message)
}
