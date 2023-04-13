'use strict'

import { Router } from 'express'
import { PM as productManager } from '../mongo/product.manager.js'

const RENDER_PATH = {
  STATIC: 'index.handlebars'
}

export const viewsRouter = Router()

viewsRouter
  .get('/', async (req, res, next) => {
    try {
      const productList = await productManager.getProducts()

      res.render(RENDER_PATH.STATIC, {
        headerTitle: 'Home | Products',
        mainTitle: 'List of products',
        list: [...productList],
        listExist: productList.length > 0
      })
    } catch (error) {
      return next(error.message)
    }
  })
