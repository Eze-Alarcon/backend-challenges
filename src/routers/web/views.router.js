// Libraries
import { Router } from 'express'

// Config
import { ROUTES } from '../../config/server.config.js'

// controller
import {
  productsPaginate,
  cartItems,
  login,
  profile,
  register,
  usersChat,
  uptProducts,
  createNewProduct,
  recoveryPass,
  setPassword
} from '../../controllers/views.controller.js'

// Middleware
import { hasSession, alreadyHasSession } from '../../middleware/autentication.js'
import { isAuthorized } from '../../controllers/session.controller.js'

export const viewsRouter = Router()

/* ============ Before authentication ============ */

viewsRouter
  .route(ROUTES.HOME_ROUTES)
  .get(alreadyHasSession, login)

viewsRouter
  .route(ROUTES.REGISTER)
  .get(alreadyHasSession, register)

viewsRouter
  .route(ROUTES.RECOVER)
  .get(alreadyHasSession, recoveryPass)

viewsRouter
  .route(`${ROUTES.SET_PASSWORD}/:tid`)
  .get(alreadyHasSession, setPassword)

/* ============ After authentication ============ */

viewsRouter
  .route(ROUTES.PROFILE)
  .get(hasSession, profile)

viewsRouter
  .route(`${ROUTES.PRODUCTS_ROUTE}new`)
  .get(hasSession, isAuthorized, createNewProduct)

viewsRouter
  .route(`${ROUTES.PRODUCTS_ROUTE}:pid`)
  .get(hasSession, isAuthorized, uptProducts)

viewsRouter
  .route(ROUTES.PRODUCTS_ROUTE)
  .get(hasSession, productsPaginate)

viewsRouter
  .route(`${ROUTES.CARTS_ROUTE}/:cid`)
  .get(hasSession, cartItems)

viewsRouter
  .route(ROUTES.CHAT)
  .get(hasSession, usersChat)

viewsRouter
  .route(ROUTES.CHAT)
  .get(hasSession, usersChat)
