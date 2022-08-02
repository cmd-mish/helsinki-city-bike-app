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
      return res.json(station)
    }
    return res.status(404).json({ error: 'station not found' })
  } catch (e) {
    return res.status(400).json({ error: e.message })
  }
})

stationService.get('/starting/:id', async (req, res) => {
  const staitonID = req.params.id
  try {
    const result = await Journey.countDocuments({ departure_station_id: staitonID })
    if (result) {
      return res.json({ id: staitonID, startJourneyCount: result })
    }
    return res.status(404).json({ error: 'station not found' })
  } catch (e) {
    return res.status(400).json({ error: e.message })
  }
})

stationService.get('/ending/:id', async (req, res) => {
  const staitonID = req.params.id
  try {
    const result = await Journey.countDocuments({ return_station_id: staitonID })
    if (result) {
      return res.json({ id: staitonID, endJourneyCount: result })
    }
    return res.status(404).json({ error: 'station not found' })
  } catch (e) {
    return res.status(400).json({ error: e.message })
  }
})

module.exports = stationService