'use strict'

import express, { Router } from 'express'
import { MM } from '../dao/mongo/messages.manager.js'

export const messageRouter = Router()

messageRouter.use(express.json())

messageRouter
  .route('/')
  .post(async (req, res, next) => {
    console.log(req.body)
    const response = await MM.addMessage(req.body)
    res.json({ rta: 'OK, informacion enviada', response })
  })
