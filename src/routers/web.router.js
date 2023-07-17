// Libraries
import { Router } from 'express'

// Web router
import { viewsRouter } from './web/views.router.js'

export const webRouter = Router()

webRouter.use(viewsRouter)
