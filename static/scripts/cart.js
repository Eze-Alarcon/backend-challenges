const btnBuy = document.getElementById('btn-buy') ?? null
// eslint-disable-next-line no-undef
const myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {})
const modalContent = document.getElementById('myModalContent')
const cartProducts = document.getElementById('cart-products-container')
const errorContainer = document.getElementById('error-container')
const errorMessage = document.getElementById('error-message')
let cartID = null

if (btnBuy !== null) {
  cartID = btnBuy.dataset.cart
}

function reloadCartProducts ({ products }) {
  const template = products
    .map((item) => (`
<div class='col-3'>
  <div class='card'>
    <div class='card-body'>
      <h5 class='card-title'>${item.product.title}</h5>
      <p class='card-text'>${item.product.description}</p>
    </div>
    <ul class='list-group list-group-flush'>
      <li class='list-group-item'>Item ID: ${item.product.id}</li>
      <li class='list-group-item'>Description: ${item.product.description}</li>
      <li class='list-group-item'>Price: $${item.product.price}</li>
      <li class='list-group-item'>Quantity: ${item.quantity}</li>
    </ul>
  </div>
</div>`))
    .join('')
  cartProducts.innerHTML = template
}

function updateModalContent ({ ticket }) {
  modalContent.innerHTML = `
    <div class="card">
      <ul class="list-group list-group-flush">
      <li class="list-group-item">Ticket code: ${ticket.code}</li>
      <li class="list-group-item">Date: ${ticket.purchase_datetime}</li>
        <li class="list-group-item">Total: $${ticket.amount}</li>
        <li class="list-group-item">Buyer: ${ticket.purchaser}</li>
      </ul>
    </div>`
}

// eslint-disable-next-line no-unused-vars
async function generateTicket () {
  const FETCH_URL = `http://localhost:8080/api/carts/${cartID}/ticket`
  const response = await fetch(FETCH_URL, { method: 'POST' })
  if (response.status === 204) {
    errorContainer.classList.remove('d-none')
    setTimeout(() => {
      errorContainer.classList.add('d-none')
    }, 8000)
    errorMessage.innerText = 'No se concretado la compra porque no hay suficiente stock disponible'
    return
  }
  errorContainer.classList.add('d-none')
  const { ticket, cart } = await response.json()
  reloadCartProducts({ products: cart.products })
  updateModalContent({ ticket })
  myModal.show()
}

// eslint-disable-next-line no-unused-vars
async function clearCart () {
  const FETCH_URL = `http://localhost:8080/api/carts/${cartID}`
  await fetch(FETCH_URL, { method: 'DELETE' })
  window.location.reload()
}
