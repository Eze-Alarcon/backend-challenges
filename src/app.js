/* eslint space-before-function-paren: 0 */
import express from 'express'
import { apiRouter } from './routers/apiRouter.js'

const PORT = 8080

const app = express()

app.use('/api', apiRouter)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
  console.log('Path: ', 'http://localhost:8080/api/products')
})
