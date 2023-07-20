const btnBuy = document.getElementById('btn-buy')

const cartID = btnBuy.dataset.cart

// eslint-disable-next-line no-unused-vars
async function generateTicket () {
  const FETCH_URL = `http://localhost:8080/api/carts/${cartID}/ticket`
  await fetch(FETCH_URL, { method: 'POST' })
  window.location.reload()
}
