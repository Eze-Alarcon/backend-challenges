/* eslint-disable no-unused-vars */
const link = document.getElementById('linkToCart') ?? null
let cartID = null

if (link !== null) cartID = link.dataset.cart

async function addProductToCart (productID) {
  const FETCH_URL = `http://localhost:8080/api/carts/${cartID}/product/${productID}`
  await fetch(FETCH_URL, { method: 'PUT' })
}

async function deleteProduct (productID) {
  const FETCH_URL = `http://localhost:8080/api/products/${productID}`
  await fetch(FETCH_URL, { method: 'DELETE' })
  window.location.reload()
}
