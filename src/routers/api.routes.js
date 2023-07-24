// Libraries
import { Router } from 'express'

// ROUTES
import { ROUTES } from '../config/server.config.js'

// API Routes
import { sessionRouter } from './api/sessions.router.js'
import { productsRouter } from './api/products.router.js'
import { cartsRouter } from './api/carts.router.js'

// Test Logger
import { checkLogs } from '../controllers/logger.controller.js'

export const apiRouter = Router()

apiRouter.use('/loggerTest', checkLogs)
apiRouter.use(ROUTES.SESSION_ROUTE, sessionRouter)
apiRouter.use(ROUTES.PRODUCTS_ROUTE, productsRouter)
apiRouter.use(ROUTES.CARTS_ROUTE, cartsRouter)
