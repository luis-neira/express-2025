'use strict'

const buildExpressApp = require('../app')

function safeBuildExpressApp (container) {
  try {
    const { logger } = container.cradle
    logger.debug('Building Express app...')
    const app = buildExpressApp(container)
    logger.debug('Express app created')
    return app
  } catch (err) {
    throw new Error(`Failed to build Express app: ${err.message}`, { cause: err })
  }
}

module.exports = safeBuildExpressApp
