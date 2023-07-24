// Libraries
import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'

// Config files
import { SERVER_CONFIG, FOLDERS, ROUTES } from './config/server.config.js'
import { COOKIE_SECRET, URL_DB } from './config/config.js'

// Middlewares
import { handleError } from './middleware/errorHandler.js'
import { passportInitialize } from './middleware/passport.config.js'

// Routers
import { apiRouter } from './routers/api.routes.js'
import { webRouter } from './routers/web.router.js'

// Socket Controller
import { newMessage, getAllMessages } from './controllers/chat.controller.js'

// --> Server
export const app = express()
app.use(express.json())

// --> DB
await mongoose.connect(URL_DB)

// --> USER SESSIONS
app.use(passportInitialize)
app.use(cookieParser(COOKIE_SECRET))

// --> FRONT
app.engine('handlebars', engine())
app.set('views', FOLDERS.VIEWS_FOLDER)
app.set('view engine', 'handlebars')
app.use(ROUTES.STATIC_ROUTE, express.static(FOLDERS.STATIC_FOLDER))

// --> routes
app.use(ROUTES.API_ROUTE, apiRouter)
app.use(webRouter)

// --> ERROR HANDLING
app.use(handleError)

const appServer = app.listen(SERVER_CONFIG.PORT, () => { console.log(`app on ${SERVER_CONFIG.BASE_URL}`) })

export const io = new Server(appServer)

io.on('connection', async client => {
  console.log(`Nuevo cliente conectado: ${client.id}`)
  await getAllMessages()
  client.on('message', async (message) => {
    console.log(message)
    await newMessage({ message: message.text, user: message.user })
  })
})
