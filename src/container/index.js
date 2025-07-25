'use strict'

const awilix = require('awilix')

const makeRentalRepo = require('@api/routes/rental/repository')
const makeTenantRepo = require('@api/routes/tenant/repository')
const { makePgInstance } = require('../infra/db')

function buildContainer ({ config, logger }) {
  const {
    asFunction,
    asValue,
    createContainer,
    Lifetime,
    InjectionMode
  } = awilix

  const awilixContainer = createContainer()

  awilixContainer.register({
    config: asValue(config),
    logger: asValue(logger),
    db: asFunction(makePgInstance, {
      lifetime: Lifetime.SINGLETON,
      injectionMode: InjectionMode.CLASSIC,
      dispose: (pg) => pg.end()
    }),
    rentalRepo: asFunction(makeRentalRepo, {
      lifetime: Lifetime.SINGLETON
    }),
    tenantRepo: asFunction(makeTenantRepo, {
      lifetime: Lifetime.SINGLETON
    })
  })

  return awilixContainer
}

module.exports = { buildContainer }
