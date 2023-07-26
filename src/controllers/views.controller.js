// libraries
import Handlebars from 'handlebars'

// Config
import { ROUTES, SERVER_CONFIG } from '../config/server.config.js'
import { COOKIE_NAME } from '../config/config.js'

// Services
import { productService } from '../services/product.service.js'
import { cartService } from '../services/cart.service.js'

// Models
import { ROLES } from '../utils/contans.js'

// Middlewares
import { verifyToken } from '../middleware/jwt.config.js'

const RENDER_PATH = {
  CART: 'cart',
  CHAT: 'chat',
  LOGIN: 'login',
  PROFILE: 'profile',
  REGISTER: 'register',
  PRODUCTS: 'products',
  UPDATE_PRODUCT: 'update',
  CRATE_PRODUCT: 'createProduct'
}

Handlebars.registerHelper('eq', function (a, b) { return a === b })

async function productsPaginate (req, res, next) {
  try {
    const { products } = await productService.getProducts(req.query)

    const token = req.signedCookies[COOKIE_NAME]

    const userInfo = await verifyToken(token)

    res.status(products.status).render(RENDER_PATH.PRODUCTS, {
      headerTitle: 'Home | Products',
      mainTitle: 'List of products',
      info: products,
      listExist: products.payload.length > 0,
      userCart: userInfo.cartID,
      urlToCart: `${SERVER_CONFIG.BASE_URL}${ROUTES.CARTS_ROUTE}/${userInfo.cartID}`,
      name: `${userInfo.first_name} ${userInfo.last_name}`,
      role: userInfo.role
    })
  } catch (error) {
    return next(error)
  }
}

async function cartItems (req, res, next) {
  try {
    const query = req.params.cid
    const myCart = await cartService.getCartById(query)

    res.status(myCart.status_code).render(RENDER_PATH.CART, {
      headerTitle: 'Home | My cart',
      mainTitle: 'My list of products',
      info: myCart.cart.products,
      userCart: myCart.cart.id,
      listExist: myCart.totalProducts > 0,
      urlToProducts: `${SERVER_CONFIG.BASE_URL}${ROUTES.PRODUCTS_ROUTE}`
    })
  } catch (error) {
    return next(error)
  }
}

function login (req, res, next) {
  res.status(200).render(RENDER_PATH.LOGIN, {
    headerTitle: 'Log in',
    mainTitle: 'Log in'
  })
}

function register (req, res, next) {
  res.status(200).render(RENDER_PATH.REGISTER, {
    headerTitle: 'Register',
    mainTitle: 'Register',
    roles: Object.values(ROLES)
  })
}

async function profile (req, res, next) {
  const token = req.signedCookies[COOKIE_NAME]

  const userInfo = await verifyToken(token)

  // TODO: ver que muestra el req.session si el usuario se logea con github

  res.status(200).render(RENDER_PATH.PROFILE, {
    headerTitle: 'HOME | Profile',
    mainTitle: 'My Profile',
    userInfo: {
      user: userInfo.email,
      name: `${userInfo.first_name} ${userInfo.last_name}`,
      age: userInfo.age,
      role: userInfo.role
    }
  })
}

async function uptProducts (req, res, next) {
  const { pid: id } = req.params
  const { item: product } = await productService.getProductById({ id })

  res.status(200).render(RENDER_PATH.UPDATE_PRODUCT, {
    headerTitle: 'HOME | Products',
    mainTitle: 'Update Product',
    product: {
      title: product.title,
      description: product.description,
      price: product.price,
      stock: product.stock
    }
  })
}

async function createNewProduct (req, res, next) {
  res.status(200).render(RENDER_PATH.CRATE_PRODUCT, {
    headerTitle: 'HOME | Products',
    mainTitle: 'Crate Product'
  })
}

async function usersChat (req, res, next) {
  const token = req.signedCookies[COOKIE_NAME]

  const { email } = await verifyToken(token)

  res.status(200).render(RENDER_PATH.CHAT, {
    headerTitle: 'HOME | Chat',
    mainTitle: 'Users Private Chat',
    user: email.split('@').at(0)
  })
}

export {
  productsPaginate,
  uptProducts,
  cartItems,
  login,
  usersChat,
  profile,
  register,
  createNewProduct
}
