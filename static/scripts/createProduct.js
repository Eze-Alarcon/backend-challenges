const form = document.getElementById('createProductForm')

// eslint-disable-next-line no-unused-vars
async function updateProduct (event) {
  event.preventDefault()
  const data = Object.fromEntries(new FormData(form))

  const FETCH_URL = 'http://localhost:8080/api/products'
  await fetch(FETCH_URL,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    }
  )
}
