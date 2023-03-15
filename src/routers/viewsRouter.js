'use strict'

import { Router } from 'express'
import { PM } from '../mocks/ProductManager.js'

const RENDER_PATH = {
  STATIC: 'index.handlebars',
  DINAMIC: 'realTimeProducts.handlebars'
}

export const viewsRouter = Router()

viewsRouter
  .get('/', async (req, res, next) => {
    try {
      const productList = await PM.getProducts()

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
  .get('/realtimeproducts', async (req, res, next) => {
    try {
      const productList = await PM.getProducts()

      res.render(RENDER_PATH.DINAMIC, {
        headerTitle: 'Home | Products',
        mainTitle: 'List of products in Real Time',
        list: [...productList],
        showList: productList.length > 0
      })
    } catch (error) {
      return next(error.message)
    }
  })
