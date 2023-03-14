'use strict'
/* eslint space-before-function-paren: 0 */
import express from 'express'
import { apiRouter } from './routers/apiRouter.js'
import { cartRouter } from './routers/cartRouter.js'
import { viewsRouter } from './routers/viewsRouter.js'
import { PM } from './mocks/ProductManager.js'
import { ERRORS } from './mocks/messages.js'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'

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
app.use('/', viewsRouter)

app.use((error, req, res, next) => {
  try {
    const { STATUS, MESSAGE } = ERRORS[error]

    return res.status(STATUS).json({ message: MESSAGE })
  } catch (error) {
    const { STATUS, MESSAGE } = ERRORS.SERVER_ERROR

    return res.status(STATUS).json({ message: MESSAGE })
  }
})

const server = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
  console.log('Path to API: ', 'http://localhost:8080/api/products')
  console.log('Path to views: ', 'http://localhost:8080/')
})

const io = new Server(server)

io.on('connection', async clientSocket => {
  console.log(`Nuevo cliente conectado: ${clientSocket.id}`)

  const products = await PM.getProducts()
  io.emit('firstLog', {
    list: products,
    showList: products.length > 0
  })
})
