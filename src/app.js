'use strict'
/* eslint space-before-function-paren: 0 */
import express from 'express'
import { apiRouter } from './routers/apiRouter.js'
import { cartRouter } from './routers/cartRouter.js'
import { viewsRouter } from './routers/viewsRouter.js'
// import { ERRORS } from './mocks/messages.js'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import { handleError } from './middleware/errors.js'
// import { PM } from './mocks/ProductManager.js'
import { socketHandle } from './middleware/socket.js'

const PORT = 8080

const app = express()
app.use('/static', express.static('./static'))

app.engine('handlebars', engine())
app.set('views', './views')

app.use('/api/products', apiRouter)
app.use('/api/cart', cartRouter)
app.use('/', viewsRouter)

app.use((error, req, res, next) => handleError(error, req, res, next))

const server = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
  console.log('Path to API: ', 'http://localhost:8080/api/products')
  console.log('Path to views: ', 'http://localhost:8080/')
})

export const io = new Server(server)

io.on('connection', async clientSocket => {
  console.log(`Nuevo cliente conectado: ${clientSocket.id}`)
  await socketHandle()
})
