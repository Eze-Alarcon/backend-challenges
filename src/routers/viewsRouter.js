'use strict'

import { Router } from 'express'
import { productsPaginate, cartItems } from '../controllers/views.controller.js'

export const viewsRouter = Router()

viewsRouter
  .route('/')
  .get(productsPaginate)

viewsRouter
  .route('/cart/:cid')
  .get(cartItems)
