const journeyService = require('express').Router()
const Journey = require('../models/journey')

const defLimitEntriesPerPage = 1000

journeyService.get('/', async (req, res) => {
  const randomJourneys = await Journey.aggregate([{ $sample: { size: 100 } }])
  return res.json(randomJourneys)
})

journeyService.get('/pages', async (req, res) => {
  const totalDocuments = await Journey.countDocuments({})
  const responseValue = Math.ceil(totalDocuments / defLimitEntriesPerPage)
  return res.json({ totalPages: responseValue })
})

journeyService.get('/pages/:number', async (req, res) => {
  const page = Number(req.params.number)
  if (isNaN(page)) return res.status(400).json({ error: 'invalid parameter' })

  const skipping = page * defLimitEntriesPerPage

  const journeys = await Journey.aggregate([{ $skip: skipping }, { $limit: defLimitEntriesPerPage }])
  if (journeys.length > 0) {
    return res.json(journeys)
  }
  return res.status(404).json({ error: 'page doesn\'t exist' })
})

journeyService.get('/total', async (req, res) => {
  const amount = await Journey.countDocuments({})
  return res.json({ totalEntries: amount })
})

module.exports = journeyService