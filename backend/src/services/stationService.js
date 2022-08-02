const stationService = require('express').Router()
const Station = require('../models/station')

stationService.get('/', async (req, res) => {
  const stations = await Station.find({})
  return res.json(stations)
})

stationService.get('/:id', async (req, res) => {
  try {
    const station = await Station.findById(req.params.id)
    if (station) {
      return res.json(station)
    }
  } catch (e) {
    return res.status(400).json({ error: e.message })
  }
})

module.exports = stationService