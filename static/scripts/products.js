
async function addProductToCart(productID) {
  const CART_ID = 1
  const FETCH_URL = `http://localhost:8080/api/v1/cart/${CART_ID}/product/${productID}`
  const data = await fetch(FETCH_URL, { method: 'PUT' })
  console.log(data)
}
