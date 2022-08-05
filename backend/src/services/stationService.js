const stationService = require('express').Router()
const Station = require('../models/station')
const Journey = require('../models/journey')

stationService.get('/', async (req, res) => {
  const stations = await Station.find({})
  return res.json(stations)
})

stationService.get('/:id', async (req, res) => {
  const requestId = Number(req.params.id)
  if (isNaN(requestId)) return res.status(400).json({ error: 'invalid parameter' })

  try {
    const station = await Station.findOne({ ID: requestId })
    let startJourneyCount, endJourneyCount, avgStart, avgEnd
    let errorMessage

    if (station) {
      try {
        startJourneyCount = await Journey.countDocuments({ departure_station_id: station.ID })
      } catch (e) {
        startJourneyCount = null
        errorMessage = e.message
      }

      try {
        endJourneyCount = await Journey.countDocuments({ return_station_id: station.ID })
      } catch (e) {
        endJourneyCount = null
        errorMessage += e.message
      }

      try {
        avgStart = await Journey.aggregate([{ $match: { departure_station_id: station.ID } }, { $group: { _id: null, avg: { $avg: '$covered_distance' } } }])
      } catch (e) {
        endJourneyCount = null
        errorMessage += e.message
      }

      try {
        avgEnd = await Journey.aggregate([{ $match: { return_station_id: station.ID } }, { $group: { _id: null, avg: { $avg: '$covered_distance' } } }])
      } catch (e) {
        endJourneyCount = null
        errorMessage += e.message
      }

      return res.json({ ...station._doc, startJourneyCount, endJourneyCount, avgStart, avgEnd, errorMessage })
    }
    return res.status(404).json({ error: 'station not found' })
  } catch (e) {
    return res.status(400).json({ error: e.message })
  }
})

stationService.get('/top5/departure/:id', async (req, res) => {
  const requestId = Number(req.params.id)
  if (isNaN(requestId)) return res.status(400).json({ error: 'invalid parameter' })

  const station = await Station.findOne({ ID: requestId })
  if (!station) {
    return res.status(404).json({ error: 'station not found' })
  }

  try {
    const journeys = await Journey.aggregate([
      { $match: { departure_station_id: requestId } },
      { $group: { _id: '$return_station_id', count: { $sum: 1 }, return_station_name: { $first: '$return_station_name' } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ])

    return res.json(journeys)
  } catch (e) {
    return res.status(400).json({ error: e.message })
  }
})

stationService.get('/top5/return/:id', async (req, res) => {
  const requestId = Number(req.params.id)
  if (isNaN(requestId)) return res.status(400).json({ error: 'invalid parameter' })

  const station = await Station.findOne({ ID: requestId })
  if (!station) {
    return res.status(404).json({ error: 'station not found' })
  }

  try {
    const journeys = await Journey.aggregate([
      { $match: { return_station_id: requestId } },
      { $group: { _id: '$departure_station_id', count: { $sum: 1 }, departure_station_name: { $first: '$departure_station_name' } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ])

    return res.json(journeys)
  } catch (e) {
    return res.status(400).json({ error: e.message })
  }
})

module.exports = stationService