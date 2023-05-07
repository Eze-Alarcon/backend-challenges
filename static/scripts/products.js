const link = document.getElementById('linkToCart')

const cartID = link.dataset.cart

// eslint-disable-next-line no-unused-vars
async function addProductToCart (productID) {
  const FETCH_URL = `http://localhost:8080/api/carts/${cartID}/product/${productID}`
  console.log(FETCH_URL)
  await fetch(FETCH_URL, { method: 'PUT' })
}
