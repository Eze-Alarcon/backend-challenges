const form = document.getElementById('createProductForm')
const toastElement = document.getElementById('liveToast')
const toastBodyMessage = document.getElementById('toast-body-message')

let toast
if (toastElement) {
  // eslint-disable-next-line no-undef
  toast = bootstrap.Toast.getOrCreateInstance(toastElement)
}

function useToast (error, message) {
  toast.show()
  setTimeout(() => toast.hide(), 3000)
  if (error) toastBodyMessage.innerText = message
  else setTimeout(() => window.location.assign('/products'), 3500)
}

// eslint-disable-next-line no-unused-vars
async function updateProduct (event) {
  event.preventDefault()
  const data = Object.fromEntries(new FormData(form))

  const FETCH_URL = 'https://backend-challenges-production.up.railway.app/api/products'
  const request = await fetch(FETCH_URL,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    }
  )
  if (request.status === 201) useToast()
  else {
    const response = await request.json()
    useToast(true, `${response.type} - ${response.cause}`)
  }
}
