const stationRouter = require('express').Router()
const Station = require('../models/station')

stationRouter.get('/', async (req, res) => {
  const services = await Station.find({})
  res.json(services)
})

module.exports = stationRouter