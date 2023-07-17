import * as dotenv from 'dotenv'

dotenv.config({
  path: 'src/config/.env'
})

// Server
const PORT = process.env.PORT

const SERVER = {
  BASE_URL: `http://localhost:${PORT}`,
  PORT
}

const ROUTES = {
  PRODUCTS_ROUTE: '/api/products/',
  SESSION_ROUTE: '/api/sessions',
  USER_ROUTE: '/api/users',
  CARTS_ROUTE: '/api/carts',
  VIEWS_ROUTES: '/',
  STATIC_ROUTE: '/static'
}

const FOLDERS = {
  STATIC_FOLDER: './static',
  VIEWS_FOLDER: './views'
}

export { SERVER, ROUTES, FOLDERS }
