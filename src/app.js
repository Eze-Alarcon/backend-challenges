'use strict'
/* eslint space-before-function-paren: 0 */

// Libraries
import express from 'express'
import { engine } from 'express-handlebars'
import mongoose from 'mongoose'

// Routers
import { productsRouter } from './routers/productsRouter.js'
import { cartsRouter } from './routers/cartsRouter.js'
// import { viewsRouter } from './routers/viewsRouter.js'

// Middlewares
import { handleError } from './middleware/errors.js'
import { SERVER_CONFIG as SC } from './config/server.config.js'
import { URL } from './config/database.config.js'

await mongoose.connect(URL)

const app = express()
app.use(SC.STATIC_ROUTE, express.static(SC.STATIC_FOLDER))

app.engine('handlebars', engine())
app.set('views', SC.VIEWS_FOLDER)

app.use(SC.PRODUCTS_ROUTE, productsRouter)
app.use(SC.CARTS_ROUTE, cartsRouter)
// app.use('/', viewsRouter)
app.use(handleError)

app.listen(SC.PORT, () => {
  console.log(`Example app listening on ${SC.BASE_URL}`)
})
