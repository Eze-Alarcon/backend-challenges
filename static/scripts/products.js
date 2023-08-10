const toastElement = document.getElementById('liveToast')
let toast
if (toastElement) {
  // eslint-disable-next-line no-undef
  toast = bootstrap.Toast.getOrCreateInstance(toastElement)
}

function useToast () {
  toast.show()
  setTimeout(() => toast.hide(), 2500)
}

/* eslint-disable no-unused-vars */
const link = document.getElementById('linkToCart') ?? null
let cartID = null

if (link !== null) cartID = link.dataset.cart

async function addProductToCart (productID) {
  const FETCH_URL = `https://backend-challenges-production.up.railway.app/api/carts/${cartID}/product/${productID}`
  await fetch(FETCH_URL, { method: 'PUT' })
  useToast()
}

async function deleteProduct (event, productID) {
  const btnDelete = event.currentTarget
  const btnUpdate = btnDelete.offsetParent.nextElementSibling.children[0]
  btnDelete.disabled = true
  btnUpdate.disabled = true
  const FETCH_URL = `https://backend-challenges-production.up.railway.app/api/products/${productID}`
  await fetch(FETCH_URL, { method: 'DELETE' })
  const card = btnDelete.offsetParent.offsetParent.parentElement
  card.remove()
}

function updateProduct (id) {
  window.location.assign(`/products/${id}`)
}
