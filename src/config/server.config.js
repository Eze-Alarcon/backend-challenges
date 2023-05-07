// Server
const PORT = 8080

const BASE_URL = `http://localhost:${PORT}`

const SECRET_WORDS = 'palabraSecreta'

// Routes
const PRODUCTS_ROUTE = '/api/products/'

const SESSION_ROUTE = '/api/sessions'

const USER_ROUTE = '/api/users'

const CARTS_ROUTE = '/api/carts'

const VIEWS_ROUTES = '/'

const STATIC_ROUTE = '/static'

// Folders
const STATIC_FOLDER = './static'

const VIEWS_FOLDER = './views'

const SERVER = {
  PORT,
  BASE_URL,
  SECRET_WORDS
}

const ROUTES = {
  PRODUCTS_ROUTE,
  CARTS_ROUTE,
  STATIC_ROUTE,
  SESSION_ROUTE,
  VIEWS_ROUTES,
  USER_ROUTE
}

const FOLDERS = {
  STATIC_FOLDER,
  VIEWS_FOLDER
}

export { SERVER, ROUTES, FOLDERS }
