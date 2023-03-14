'use strict'

import { Router } from 'express'
import { PM } from '../mocks/ProductManager.js'

export const homeRouter = Router()

homeRouter
  .route('/')
  .get(async (req, res, next) => {
    try {
      const productList = await PM.getProducts()

      res.render('list.handlebars', {
        headerTitle: 'Home | Products',
        mainTitle: 'List of products',
        list: [...productList],
        listExist: productList.length > 0
      })
    } catch (error) {
      return next(error.message)
    }
  })
