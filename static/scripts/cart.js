/* eslint-disable no-unused-vars */
const btnBuy = document.getElementById('btn-buy') ?? null
let cartID = null

if (btnBuy !== null) {
  cartID = btnBuy.dataset.cart
}

async function generateTicket () {
  const FETCH_URL = `http://localhost:8080/api/carts/${cartID}/ticket`
  const response = await fetch(FETCH_URL, { method: 'POST' })
  const data = await response.json()
  console.log(data)
  // window.location.reload()
}

async function clearCart () {
  const FETCH_URL = `http://localhost:8080/api/carts/${cartID}`
  await fetch(FETCH_URL, { method: 'DELETE' })
  window.location.reload()
}

// Modal
const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')
const modalContent = document.getElementById('myModalContent')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})
