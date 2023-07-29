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
  const FETCH_URL = `http://localhost:8080/api/carts/${cartID}/product/${productID}`
  await fetch(FETCH_URL, { method: 'PUT' })
  useToast()
}

async function deleteProduct (event, productID) {
  const btnDelete = event.srcElement
  const btnUpdate = btnDelete.nextElementSibling
  btnUpdate.disabled = true
  btnDelete.disabled = true
  const FETCH_URL = `http://localhost:8080/api/products/${productID}`
  await fetch(FETCH_URL, { method: 'DELETE' })
  const card = event.srcElement.offsetParent.offsetParent.parentElement
  card.remove()
}
