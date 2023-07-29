const form = document.getElementById('createProductForm')
const toastElement = document.getElementById('liveToast')
let toast
if (toastElement) {
  // eslint-disable-next-line no-undef
  toast = bootstrap.Toast.getOrCreateInstance(toastElement)
}

function useToast () {
  toast.show()
  setTimeout(() => toast.hide(), 2500)
  setTimeout(() => window.location.assign('/products'), 3000)
}

// eslint-disable-next-line no-unused-vars
async function updateProduct (event) {
  event.preventDefault()
  const data = Object.fromEntries(new FormData(form))

  const FETCH_URL = 'http://localhost:8080/api/products'
  await fetch(FETCH_URL,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    }
  )
  useToast()
}
