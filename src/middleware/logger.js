import { winstonLogger } from '../utils/logger.js'

export const logger = (req, res, next) => {
  req.logger = winstonLogger
  // req.logger.debug(`${req.method} en ${req.url} - ${new Intl.DateTimeFormat('en', { dateStyle: 'full', timeStyle: 'long' }).format()}`)
  next()
}
