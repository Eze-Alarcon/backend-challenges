async function checkLogs (req, res, next) {
  req.logger.fatal('log fatal')
  req.logger.error('log error')
  req.logger.warning('log warning')
  req.logger.info('log info')
  req.logger.http('log http')
  req.logger.debug('log debug')
  res.json({ message: 'login success', isLog: true })
}

export { checkLogs }
