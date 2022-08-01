const journeyService = require('express').Router()
const Journey = require('../models/journey')

journeyService.get('/', async (req, res) => {
  const journeys = await Journey.aggregate([{ $sample: { size: 100 } }])
  res.json(journeys)
})

module.exports = journeyService