import { Router } from 'express'

import { ROUTES } from '../../config/server.config.js'

import { productsPaginate, cartItems, login, profile, register } from '../../controllers/views.controller.js'
import { hasSession, alreadyHasSession } from '../../middleware/session.js'

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
  .route(ROUTES.PRODUCTS_ROUTE)
  .get(hasSession, productsPaginate)

viewsRouter
  .route(`${ROUTES.CARTS_ROUTE}/:cid`)
  .get(hasSession, cartItems)
