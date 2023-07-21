const form = document.getElementById('updateProductForm')

const productID = window.location.pathname.split('/').at(-1)

// eslint-disable-next-line no-unused-vars
async function updateProduct (event) {
  event.preventDefault()
  const data = Object.fromEntries(new FormData(form))

  const FETCH_URL = `http://localhost:8080/api/products/${productID}`
  await fetch(FETCH_URL,
    {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    }
  )
}
