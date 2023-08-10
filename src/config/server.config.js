// Libraries
import * as dotenv from 'dotenv'

dotenv.config({
  path: 'src/config/.env'
})

// Server
const PORT = process.env.PORT || '8080'
const NODE_ENV = process.env.NODE_ENV || 'development'
const LOG_LEVEL = parseInt(process.env.LOG_LEVEL || '10')

const SERVER_CONFIG = {
  BASE_URL: `http://localhost:${PORT}`,
  PORT: parseInt(PORT),
  NODE_ENV,
  LOG_LEVEL
}

const API_ROUTES = {
  API_ROUTE: '/api',
  PRODUCTS_ROUTE: '/products/',
  SESSION_ROUTE: '/sessions',
  USER_ROUTE: '/users',
  CARTS_ROUTE: '/carts',
  CHAT_ROUTE: '/chat',
  DOCS_ROUTE: '/docs'
}

const WEB_ROUTES = {
  HOME_ROUTES: '/',
  STATIC_ROUTE: '/static',
  REGISTER: '/register',
  PROFILE: '/profile',
  CHAT: '/chat',
  RECOVER: '/recoverPassword',
  SET_PASSWORD: '/newpassword',
  ADMIN_PANEL: '/adminpanel'
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
