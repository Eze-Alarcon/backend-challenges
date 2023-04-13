'use strict'
/* eslint space-before-function-paren: 0 */

// Libraries
import express from 'express'
import { engine } from 'express-handlebars'
import mongoose from 'mongoose'

// Routers
import { productsRouter } from './routers/productsRouter.js'
// import { cartsRouter } from './routers/cartsRouter.js'
// import { viewsRouter } from './routers/viewsRouter.js'

// Middlewares
import { handleError } from './middleware/errors.js'
import { PORT } from './config/server.config.js'
import { URL } from './config/database.config.js'

await mongoose.connect(URL)

const app = express()
app.use('/static', express.static('./static'))

app.engine('handlebars', engine())
app.set('views', './views')

app.use('/api/v1/products', productsRouter)
// app.use('/api/v1/cart', cartsRouter)
// app.use('/', viewsRouter)
app.use(handleError)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
