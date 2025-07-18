'use strict'

const createError = require('http-errors')

function deleteRental ({ rentalRepo }) {
  return async (req, res, next) => {
    const { id } = req.params

    const parsedId = Number(id)

    if (Number.isNaN(parsedId)) {
      return next(createError.BadRequest())
    }

    const result = await rentalRepo.deleteRental(parsedId)

    if (result === 0) {
      return next(createError.NotFound())
    }

    res.sendStatus(200)
  }
}

module.exports = deleteRental
