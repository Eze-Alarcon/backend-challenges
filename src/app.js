
// Libraries
import express from 'express'
import mongoose from 'mongoose'
import { engine } from 'express-handlebars'

// Constants
import { SERVER, FOLDERS, ROUTES } from './config/server.config.js'
import { URL_DB } from './config/database.config.js'

// Routers
import { sessionRouter } from './routers/sessions.router.js'
import { productsRouter } from './routers/products.router.js'
import { cartsRouter } from './routers/carts.router.js'
import { viewsRouter } from './routers/views.router.js'

// Middlewares
import { handleError } from './middleware/errors.js'
import { passportInitialize } from './middleware/passport.config.js'
import cookieParser from 'cookie-parser'

await mongoose.connect(URL_DB)

const COOKIE_SECRET = 'cookie_secret'

const app = express()
app.use(cookieParser(COOKIE_SECRET))
app.use(ROUTES.STATIC_ROUTE, express.static(FOLDERS.STATIC_FOLDER))

app.engine('handlebars', engine())
app.set('views', FOLDERS.VIEWS_FOLDER)
app.set('view engine', 'handlebars')

// acá cargo passport en el servidor express como middleware
app.use(passportInitialize)

app.use(ROUTES.SESSION_ROUTE, sessionRouter)
app.use(ROUTES.PRODUCTS_ROUTE, productsRouter)
app.use(ROUTES.CARTS_ROUTE, cartsRouter)
app.use(ROUTES.VIEWS_ROUTES, viewsRouter)
app.use(handleError)

app.listen(SERVER.PORT, () => {
  console.log(`app on ${SERVER.BASE_URL}`)
})
