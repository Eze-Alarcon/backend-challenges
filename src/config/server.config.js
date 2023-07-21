// Libraries
import * as dotenv from 'dotenv'

dotenv.config({
  path: 'src/config/.env'
})

// Server
const PORT = process.env.PORT

const SERVER_CONFIG = {
  BASE_URL: `http://localhost:${PORT}`,
  PORT
}

const API_ROUTES = {
  API_ROUTE: '/api',
  PRODUCTS_ROUTE: '/products/',
  SESSION_ROUTE: '/sessions',
  USER_ROUTE: '/users',
  CARTS_ROUTE: '/carts',
  CHAT_ROUTE: '/chat'
}

const WEB_ROUTES = {
  HOME_ROUTES: '/',
  STATIC_ROUTE: '/static',
  REGISTER: '/register',
  PROFILE: '/profile',
  CHAT: '/chat'
}

const ROUTES = {
  ...API_ROUTES,
  ...WEB_ROUTES
}

const FOLDERS = {
  STATIC_FOLDER: './static',
  VIEWS_FOLDER: './views'
}

export { SERVER_CONFIG, ROUTES, FOLDERS }
