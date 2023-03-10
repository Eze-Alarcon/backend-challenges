import express, { Router } from 'express'
import { PM } from '../mocks/ProductManager.js'
import { limitProducts } from '../logic/helpers.js'

export const apiRouter = Router()

apiRouter.use(express.json())

apiRouter
  .route('/products/:pid')
  .get(async (req, res, next) => {
    try {
      const product = await PM.getProductById(req.params.pid)
      res.status(product.status_code).json(product)
    } catch (error) {
      return next(error.message)
    }
  })
  .put(async (req, res, next) => {
    try {
      const product = await PM.updateProduct(req.params.pid, req.body)
      res.status(product.status_code).json(product)
    } catch (error) {
      return next(error.message)
    }
  })
  .delete(async (req, res, next) => {
    try {
      const product = await PM.deleteProduct(req.params.pid)
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
  .post(async (req, res, next) => {
    try {
      const response = await PM.addProduct(req.body)
      res.status(response.status_code).json(response.productAdded)
    } catch (error) {
      next(error.message)
    }
  })

/*

*/
