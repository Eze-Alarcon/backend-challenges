/* eslint space-before-function-paren: 0 */
import express from 'express'
import { PM } from './mocks/ProductManager.js'
import { limitProducts } from './logic/middleware.js'

const app = express()
const port = 8080

app.route('/products/:id?')
  .get(async (req, res) => {
    if (req.query?.limit || req.query?.page) {
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
    } else if (req.params.id) {
      const product = await PM.getProductById(req.params.id)
      if (product.error) res.json({ error: product.msg })
      else {
        res.json(product)
      }
    } else {
      const products = await PM.getProducts()
      res.json({
        totalProducts: products.length,
        products
      })
    }
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log('Path: ', 'http://localhost:8080/products')
})
