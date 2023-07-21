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
  createNewProduct
} from '../../controllers/views.controller.js'

// Middleware
import { hasSession, alreadyHasSession } from '../../middleware/autentication.js'
import { isAdmin } from '../../controllers/session.controller.js'

export const viewsRouter = Router()

viewsRouter
  .route(ROUTES.HOME_ROUTES)
  .get(alreadyHasSession, login)

viewsRouter
  .route(ROUTES.REGISTER)
  .get(alreadyHasSession, register)

viewsRouter
  .route(ROUTES.PROFILE)
  .get(hasSession, profile)

viewsRouter
  .route(`${ROUTES.PRODUCTS_ROUTE}new`)
  .get(hasSession, isAdmin, createNewProduct)

viewsRouter
  .route(`${ROUTES.PRODUCTS_ROUTE}:pid`)
  .get(hasSession, isAdmin, uptProducts)

viewsRouter
  .route(ROUTES.PRODUCTS_ROUTE)
  .get(hasSession, productsPaginate)

viewsRouter
  .route(`${ROUTES.CARTS_ROUTE}/:cid`)
  .get(hasSession, cartItems)

viewsRouter
  .route(ROUTES.CHAT)
  .get(hasSession, usersChat)
