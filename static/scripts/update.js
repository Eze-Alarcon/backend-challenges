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

const form = document.getElementById('updateProductForm')

const productID = window.location.pathname.split('/').at(-1)

// eslint-disable-next-line no-unused-vars
async function updateProduct (event) {
  event.preventDefault()
  const data = Object.fromEntries(new FormData(form))

  await fetch(`https://backend-challenges-production.up.railway.app/api/products/${productID}`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    }
  )
  useToast()
}
