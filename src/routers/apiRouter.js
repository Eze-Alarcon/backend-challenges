import { Router } from 'express'
import { PM } from '../mocks/ProductManager.js'
import { limitProducts } from '../logic/middleware.js'

export const apiRouter = Router()

apiRouter
  .route('/products/:id')
  .get(async (req, res, next) => {
    try {
      const product = await PM.getProductById(req.params.id)
      res.json(product)
    } catch (error) {
      return next(error.message)
    }
  })

apiRouter
  .route('/products')
  .get(async (req, res, next) => {
    const { limit, page } = req.query
    if (limit === undefined && page === undefined) return next()
    try {
      const allProducts = await PM.getProducts()
      const list = await limitProducts(allProducts, limit, page)
      res.json({
        limit: limit ?? '5',
        page: page ?? '1',
        list
      })
    } catch (error) {
      return next(error)
    }
  })
  .get(async (req, res) => {
    const products = await PM.getProducts()
    res.json({
      totalProducts: products.length,
      products
    })
  })
