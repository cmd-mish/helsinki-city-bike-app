const stationService = require('express').Router()
const Station = require('../models/station')
const Journey = require('../models/journey')

stationService.get('/', async (req, res) => {
  const stations = await Station.find({})
  return res.json(stations)
})

stationService.get('/:id', async (req, res) => {
  try {
    const station = await Station.findById(req.params.id)
    if (station) {
      const startJourneyCount = await Journey.countDocuments({ departure_station_id: station.ID })
      const endJourneyCount = await Journey.countDocuments({ return_station_id: station.ID })
      return res.json({ ...station._doc, startJourneyCount, endJourneyCount })
    }
    return res.status(404).json({ error: 'station not found' })
  } catch (e) {
    return res.status(400).json({ error: e.message })
  }
})

module.exports = stationService