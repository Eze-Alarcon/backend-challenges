'use strict'

import { Router } from 'express'
import { productsPaginate, cartItems, login } from '../controllers/views.controller.js'
import { hasSession, alreadyHasSession } from '../middleware/session.js'

export const viewsRouter = Router()

viewsRouter
  .route('/')
  .get(alreadyHasSession, login)

viewsRouter
  .route('/products')
  .get(hasSession, productsPaginate)

viewsRouter
  .route('/cart/:cid')
  .get(hasSession, cartItems)
