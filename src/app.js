/* eslint space-before-function-paren: 0 */
import express from 'express'
import { apiRouter } from './routers/apiRouter.js'
import { ERRORS } from './mocks/messages.js'

const PORT = 8080

const app = express()

app.use('/api', apiRouter)

app.use((error, req, res, next) => {
  const { status, message } = ERRORS[error]

  return res.status(status).json({
    message,
    status
  })
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
  console.log('Path: ', 'http://localhost:8080/api/products')
})
