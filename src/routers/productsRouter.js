'use strict'
import express, { Router } from 'express'
import { PM as productManager } from '../mongo/product.manager.js'

export const productsRouter = Router()

productsRouter.use(express.json())

productsRouter
  .route('/:pid')
  .get(async (req, res, next) => {
    try {
      const response = await productManager.getProductById(req.params.pid)
      res.status(response.status_code).json(response.item)
    } catch (error) {
      return next(error.message)
    }
  })
  .put(async (req, res, next) => {
    try {
      const response = await productManager.updateProduct(req.params.pid, req.body)

      res.status(response.status_code).json(response.itemUpdated)
    } catch (error) {
      return next(error.message)
    }
  })
  .delete(async (req, res, next) => {
    try {
      const response = await productManager.deleteProduct(req.params.pid)

      res.status(response.status_code).json({ product_deleted: response.itemDeleted })
    } catch (error) {
      return next(error.message)
    }
  })

productsRouter
  .route('/')
  // Deberá poder recibir por query params un limit (opcional), una page (opcional), un sort (opcional) y un query (opcional)
  .get(async (req, res, next) => {
    // if (
    //   req.query.limit === undefined &&
    //   req.query.page === undefined
    // ) return next()
    try {
      const products = await productManager.getProducts(req.query)
      res.json({
        payload: products
        // status,
        // totalPages,
        // prevPage,
        // nextPage,
        // page,
        // hasPrevPage,
        // hasNextPage,
        // prevLink,
        // nextLink
      })

      /*
        {
          status: success/error
          payload: Resultado de los productos solicitados
          totalPages: Total de páginas
          prevPage: Página anterior
          nextPage: Página siguiente
          page: Página actual
          hasPrevPage: Indicador para saber si la página previa existe
          hasNextPage: Indicador para saber si la página siguiente existe.
          prevLink: Link directo a la página previa (null si hasPrevPage=false)
          nextLink: Link directo a la página siguiente (null si hasNextPage=false)
        }
      */
    } catch (error) {
      return next(error.message)
    }
  })
  .post(async (req, res, next) => {
    try {
      const response = await productManager.addProduct(req.body)
      res.status(response.status_code).json(response.productAdded)
    } catch (error) {
      return next(error.message)
    }
  })
