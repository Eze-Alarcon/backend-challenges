import { Router } from 'express'
import { PM } from '../mocks/ProductManager.js'
import { limitProducts } from '../logic/helpers.js'

export const apiRouter = Router()

apiRouter
  .route('/products/:id')
  .get(async (req, res, next) => {
    try {
      const product = await PM.getProductById(req.params.id)
      res.status(product.status_code).json(product)
    } catch (error) {
      return next(error.message)
    }
  })

apiRouter
  .route('/products')
  .get(async (req, res, next) => {
    if (req.query.limit === undefined &&
      req.query.page === undefined
    ) return next()
    try {
      const allProducts = await PM.getProducts()
      const list = limitProducts(allProducts, req.query.limit, req.query.page)
      res.json({
        limit: list.parsedLimit,
        page: list.parsedPage,
        list
      })
    } catch (error) {
      return next(error.message)
    }
  })
  .get(async (req, res) => {
    const products = await PM.getProducts()
    res.json({
      lenght: products.length,
      products
    })
  })
