// libraries
import Handlebars from 'handlebars'

// Config
import { COOKIE_NAME } from '../config/config.js'
import { ROUTES } from '../config/server.config.js'

// Utils
import { ROLES, RENDER_PATHS } from '../utils/contans.js'
import { STATUS_CODE } from '../utils/errors.messages.js'
import { verifyToken } from '../utils/jwt.config.js'

// Services
import { userService } from '../services/user.service.js'
import { productService } from '../services/product.service.js'
import { cartService } from '../services/cart.service.js'

// Handlebars helpers
Handlebars.registerHelper('eq', function (a, b) { return a === b })

Handlebars.registerHelper('if-or', function (exp1, exp2, options) {
  if (exp1 || exp2) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})

Handlebars.registerHelper('if-and', function (exp1, exp2, options) {
  if (exp1 && exp2) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})

Handlebars.registerHelper('if-NotAndNot', function (exp1, exp2, options) {
  if (!exp1 && !exp2) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})

async function productsPaginate (req, res, next) {
  try {
    const { products } = await productService.getMany(req.query ?? {})
    const token = req.signedCookies[COOKIE_NAME]
    const userInfo = await verifyToken(token)

    res
      .status(STATUS_CODE.SUCCESS.OK)
      .render(RENDER_PATHS.PRODUCTS, {
        headerTitle: 'Home | Products',
        mainTitle: 'List of products',
        info: products,
        listExist: products.payload.length > 0,
        userCart: userInfo.cartID,
        name: `${userInfo.first_name} ${userInfo.last_name}`,
        role: userInfo.role,
        userEmail: userInfo.email
      })
  } catch (error) {
    return next(error)
  }
}

async function cartItems (req, res, next) {
  try {
    const { cart, total_products } = await cartService.getOne({ id: req.params.cid })

    res
      .status(STATUS_CODE.SUCCESS.OK)
      .render(RENDER_PATHS.CART, {
        headerTitle: 'Home | My cart',
        mainTitle: 'My list of products',
        info: cart.products,
        userCart: cart.id,
        listExist: total_products > 0
      })
  } catch (error) {
    return next(error)
  }
}

function login (req, res, next) {
  try {
    res
      .status(STATUS_CODE.SUCCESS.OK)
      .render(RENDER_PATHS.LOGIN, {
        headerTitle: 'Log in',
        mainTitle: 'Log in'
      })
  } catch (error) {
    res
      .status(STATUS_CODE.CLIENT_ERROR.NOT_FOUND)
      .render(RENDER_PATHS.NOT_EXIST, {
        cause: error.type,
        message: 'An error occurred during the log, try reloading the page and try again.'
      })
  }
}

function register (req, res, next) {
  try {
    res
      .status(STATUS_CODE.SUCCESS.OK)
      .render(RENDER_PATHS.REGISTER, {
        headerTitle: 'Register',
        mainTitle: 'Register',
        roles: Object.values(ROLES)
      })
  } catch (error) {
    res
      .status(STATUS_CODE.CLIENT_ERROR.NOT_FOUND)
      .render(RENDER_PATHS.NOT_EXIST, {
        cause: error.type,
        message: 'An error occurred during the registration process, try reloading the page and try again.'
      })
  }
}

async function profile (req, res, next) {
  try {
    const token = req.signedCookies[COOKIE_NAME]
    const userInfo = await verifyToken(token)

    res
      .status(STATUS_CODE.SUCCESS.OK)
      .render(RENDER_PATHS.PROFILE, {
        headerTitle: 'HOME | Profile',
        mainTitle: 'My Profile',
        userInfo: {
          user: userInfo.email,
          name: `${userInfo.first_name} ${userInfo.last_name}`,
          age: userInfo.age,
          role: userInfo.role
        }
      })
  } catch (error) {
    res
      .status(STATUS_CODE.CLIENT_ERROR.NOT_FOUND)
      .render(RENDER_PATHS.NOT_EXIST, {
        cause: error.type,
        message: 'An error occurred while accessing your profile, try reloading the page and try again.'
      })
  }
}

async function uptProducts (req, res, next) {
  try {
    const { product } = await productService.getOne({ id: req.params.pid })

    res
      .status(STATUS_CODE.SUCCESS.OK)
      .render(RENDER_PATHS.UPDATE_PRODUCT, {
        headerTitle: 'HOME | Products',
        mainTitle: 'Update Product',
        product: {
          title: product.title,
          description: product.description,
          price: product.price,
          stock: product.stock
        }
      })
  } catch (error) {
    res
      .status(STATUS_CODE.CLIENT_ERROR.NOT_FOUND)
      .render(RENDER_PATHS.NOT_EXIST, {
        cause: error.type,
        message: 'We have not found any match for the product you are looking for.'
      })
  }
}

async function createNewProduct (req, res, next) {
  res
    .status(STATUS_CODE.SUCCESS.OK)
    .render(RENDER_PATHS.CRATE_PRODUCT, {
      headerTitle: 'HOME | Products',
      mainTitle: 'Crate Product'
    })
}

async function usersChat (req, res, next) {
  const token = req.signedCookies[COOKIE_NAME]
  const { email } = await verifyToken(token)

  res
    .status(STATUS_CODE.SUCCESS.OK)
    .render(RENDER_PATHS.CHAT, {
      headerTitle: 'HOME | Chat',
      mainTitle: 'Users Private Chat',
      user: email.split('@').at(0)
    })
}

async function recoveryPass (req, res, next) {
  res
    .status(STATUS_CODE.SUCCESS.OK)
    .render(RENDER_PATHS.RECOVERY_PASSWORD, {
      headerTitle: 'Recover password'
    })
}

async function setPassword (req, res, next) {
  try {
    const token = req.params.tid
    const status = await verifyToken(token)
    res
      .status(STATUS_CODE.SUCCESS.OK)
      .render(RENDER_PATHS.SET_PASSWORD, {
        headerTitle: 'Recover password',
        email: status.email
      })
  } catch (error) {
    return res.redirect(ROUTES.RECOVER)
  }
}

async function adminPanel (req, res, next) {
  try {
    const token = req.signedCookies[COOKIE_NAME]
    const { email } = await verifyToken(token)
    const { users } = await userService.getMany({ email: { $ne: email } }, { email: 1, role: 1, first_name: 1 }, true)

    res
      .status(STATUS_CODE.SUCCESS.OK)
      .render(RENDER_PATHS.ADMIN_PANEL, {
        headerTitle: 'HOME | Admin panel',
        users
      })
  } catch (error) {
    return res.redirect(ROUTES.RECOVER)
  }
}

async function routeNotExist (req, res, next) {
  try {
    res
      .status(STATUS_CODE.CLIENT_ERROR.NOT_FOUND)
      .render(RENDER_PATHS.NOT_EXIST, {
        cause: 'The route you are looking for is not available',
        message: 'Check that the url is well written, if it is well written there is a possibility that the endpoint does not exist.'
      })
  } catch (error) {
    return res.redirect(ROUTES.RECOVER)
  }
}

export {
  productsPaginate,
  uptProducts,
  cartItems,
  login,
  usersChat,
  profile,
  register,
  createNewProduct,
  recoveryPass,
  setPassword,
  adminPanel,
  routeNotExist
}
