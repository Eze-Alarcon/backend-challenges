'use strict'
/* eslint space-before-function-paren: 0 */
import express from 'express'
import { apiRouter } from './routers/apiRouter.js'
import { cartRouter } from './routers/cartRouter.js'
import { homeRouter } from './routers/homeRouter.js'
import { ERRORS } from './mocks/messages.js'
import { engine } from 'express-handlebars'

const PORT = 8080

const app = express()
app.use('/static', express.static('./static'))

/*
  TO DO: Agregar el urlEncoded!
  * Esto sera para el formulario
*/

app.engine('handlebars', engine())
app.set('views', './views')

app.use('/api/products', apiRouter)
app.use('/api/cart', cartRouter)
app.use(homeRouter)

// TO DO with web sockets

app.get('/realtimeproducts', async (req, res, next) => {
  try {
    res.render('home.handlebars', { titulo: 'Inicio', encabezado: 'Inicio' })
  } catch (error) {
    console.log(error)
    next(error.message)
  }
})

app.use((error, req, res, next) => {
  try {
    const { STATUS, MESSAGE } = ERRORS[error]

    return res.status(STATUS).json({ message: MESSAGE })
  } catch (error) {
    const { STATUS, MESSAGE } = ERRORS.SERVER_ERROR

    return res.status(STATUS).json({ message: MESSAGE })
  }
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
  console.log('Path: ', 'http://localhost:8080/api/products')
})
