/* eslint space-before-function-paren: 0 */
import express from 'express'
import { PM } from './mocks/ProductManager.js'
import { limitProducts, sanitise } from './logic/middleware.js'

const app = express()
const port = 8080

app.route('/products/:id?')
  .get(async (req, res) => {
    if (req.query?.limit || req.query?.page) {
      try {
        const limit = sanitise(req.query.limit)
        const page = sanitise(req.query.page)

        const allProducts = await PM.getProducts()
        const arr = await limitProducts(allProducts, limit, page)
        console.log(arr)
        res.json({
          limit,
          page,
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
  console.log('Path: ', 'http://localhost:8080/')
})
