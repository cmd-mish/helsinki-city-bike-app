const stationService = require('express').Router()
const Station = require('../models/station')
const Journey = require('../models/journey')

stationService.get('/', async (req, res) => {
  const stations = await Station.find({})
  return res.json(stations)
})

stationService.get('/:id', async (req, res) => {
  try {
    const station = await Station.findOne({ ID: req.params.id })
    let startJourneyCount, endJourneyCount
    let statsErrorMessage

    if (station) {
      try {
        startJourneyCount = await Journey.countDocuments({ departure_station_id: station.ID })
      } catch (e) {
        startJourneyCount = null
        statsErrorMessage = e.message
      }

      try {
        endJourneyCount = await Journey.countDocuments({ return_station_id: station.ID })
      } catch (e) {
        endJourneyCount = null
        statsErrorMessage += e.message
      }

      return res.json({ ...station._doc, startJourneyCount, endJourneyCount, statsErrorMessage })
    }
    return res.status(404).json({ error: 'station not found' })
  } catch (e) {
    return res.status(400).json({ error: e.message })
  }
})

module.exports = stationService