/* eslint-disable space-before-function-paren */
import { PM as productManager } from '../mongo/product.manager.js'
import { CM as cartManager } from '../mongo/cart.manager.js'
import { SERVER } from '../config/server.config.js'

const VIEWS_LINKS = {
  goToProducts: `${SERVER.BASE_URL}/products`,
  goToCart: `${SERVER.BASE_URL}/cart/1`
}

const RENDER_PATH = {
  PRODUCTS: 'products.handlebars',
  CART: 'cart.handlebars',
  LOGIN: 'login.handlebars'
}

async function productsPaginate(req, res, next) {
  try {
    const { products } = await productManager.getProducts(req.query)

    res.status(products.status).render(RENDER_PATH.PRODUCTS, {
      headerTitle: 'Home | Products',
      mainTitle: 'List of products',
      info: products,
      listExist: products.payload.length > 0,
      urlToCart: VIEWS_LINKS.goToCart
    })
  } catch (error) {
    return next(error.message)
  }
}

async function cartItems(req, res, next) {
  try {
    const query = req.params.cid
    const myCart = await cartManager.getCartById(query)

    res.status(myCart.status_code).render(RENDER_PATH.CART, {
      headerTitle: 'Home | My cart',
      mainTitle: 'My list of products',
      info: myCart.cart.products,
      listExist: myCart.totalProducts > 0,
      urlToProducts: VIEWS_LINKS.goToProducts
    })
  } catch (error) {
    return next(error.message)
  }
}

function login(req, res, next) {
  res.status(200).render(RENDER_PATH.LOGIN, {
    headerTitle: 'Login',
    mainTitle: 'Iniciar sesion'
  })
}

export { productsPaginate, cartItems, login }
