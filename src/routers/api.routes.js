// Libraries
import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'

// ROUTES
import { ROUTES } from '../config/server.config.js'

// API Routes
import { sessionRouter } from './api/sessions.router.js'
import { productsRouter } from './api/products.router.js'
import { cartsRouter } from './api/carts.router.js'
import { userRouter } from './api/users.router.js'

// Utils
import { swaggerSpecs } from '../utils/swagger.js'

export const apiRouter = Router()

apiRouter.use(ROUTES.SESSION_ROUTE, sessionRouter)
apiRouter.use(ROUTES.PRODUCTS_ROUTE, productsRouter)
apiRouter.use(ROUTES.CARTS_ROUTE, cartsRouter)
apiRouter.use(ROUTES.USER_ROUTE, userRouter)

// Swagger
apiRouter.use(ROUTES.DOCS_ROUTE, swaggerUi.serve, swaggerUi.setup(swaggerSpecs))
