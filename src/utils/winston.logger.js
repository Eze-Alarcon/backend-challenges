import { SERVER_CONFIG } from '../config/server.config.js'
import winston from 'winston'

const levels = {
  fatal: 0,
  error: 1,
  warning: 2,
  info: 3,
  http: 4,
  debug: 5
}

const winstonLoggerDev = winston.createLogger({
  levels,
  transports: [
    new winston.transports.Console({
      level: 'debug'
    })
  ]
})

const winstonLoggerProd = winston.createLogger({
  levels,
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: 'errors.log'
    })
  ]
})

export let winstonLogger
if (SERVER_CONFIG.NODE_ENV === 'production') {
  winstonLogger = winstonLoggerProd
} else {
  winstonLogger = winstonLoggerDev
}
