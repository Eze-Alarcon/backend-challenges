const PORT = 8080

const BASE_URL = `http://localhost:${PORT}`

const PRODUCTS_ROUTE = '/api/v1/products/'

const CARTS_ROUTE = '/api/v1/cart'

const STATIC_ROUTE = '/static'

const STATIC_FOLDER = './static'

const VIEWS_FOLDER = './views'

const SERVER_CONFIG = {
  PORT,
  BASE_URL,
  PRODUCTS_ROUTE,
  CARTS_ROUTE,
  STATIC_ROUTE,
  STATIC_FOLDER,
  VIEWS_FOLDER
}

export { SERVER_CONFIG }
