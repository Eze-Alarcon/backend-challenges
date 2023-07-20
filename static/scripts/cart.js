/* eslint-disable no-unused-vars */
const btnBuy = document.getElementById('btn-buy') ?? null
let cartID = null

if (btnBuy !== null) {
  cartID = btnBuy.dataset.cart
}

async function generateTicket () {
  const FETCH_URL = `http://localhost:8080/api/carts/${cartID}/ticket`
  await fetch(FETCH_URL, { method: 'POST' })
  window.location.reload()
}

async function clearCart () {
  const FETCH_URL = `http://localhost:8080/api/carts/${cartID}`
  await fetch(FETCH_URL, { method: 'DELETE' })
  window.location.reload()
}
