const link = document.getElementById('linkToCart') ?? null
let cartID = null

if (link !== null) cartID = link.dataset.cart

// eslint-disable-next-line no-unused-vars
async function addProductToCart (productID) {
  const FETCH_URL = `http://localhost:8080/api/carts/${cartID}/product/${productID}`
  await fetch(FETCH_URL, { method: 'PUT' })
}
