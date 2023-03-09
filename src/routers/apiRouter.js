import { Router } from 'express'
import { PM } from '../mocks/ProductManager.js'
import { limitProducts } from '../logic/middleware.js'

export const apiRouter = Router()

const regex = /^.products\?(page|limit)=.+/mgi

apiRouter
  .route(regex)
  .get(async (req, res) => {
    try {
      const { limit, page } = req.query
      const allProducts = await PM.getProducts()
      const arr = await limitProducts(allProducts, limit, page)
      res.json({
        limit: limit ?? '5',
        page: page ?? '1',
        arr
      })
    } catch (e) {
      res.json({
        Error: e.message
      })
    }
  })

apiRouter
  .route('/products/:id')
  .get(async (req, res) => {
    const product = await PM.getProductById(req.params.id)
    if (product.error) res.json({ error: product.msg })
    else {
      res.json(product)
    }
  })

apiRouter
  .route('/products')
  .get(async (req, res) => {
    const products = await PM.getProducts()
    res.json({
      totalProducts: products.length,
      products
    })
  })
