const stationService = require('express').Router()
const Station = require('../models/station')

stationService.get('/', async (req, res) => {
  const services = await Station.find({})
  res.json(services)
})

module.exports = stationService