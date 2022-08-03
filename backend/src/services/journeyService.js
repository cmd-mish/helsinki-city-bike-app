const journeyService = require('express').Router()
const Journey = require('../models/journey')

const defLimitEntriesPerPage = 1000

journeyService.get('/', async (req, res) => {
  const randomJourneys = await Journey.aggregate([{ $sample: { size: 100 } }])
  return res.json(randomJourneys)
})

journeyService.get('/pages', async (req, res) => {
  const totalDocuments = await Journey.estimatedDocumentCount()
  const responseValue = Math.ceil(totalDocuments / defLimitEntriesPerPage)
  return res.json({ totalPages: responseValue })
})

journeyService.get('/pages/:number', async (req, res) => {
  const sortBy = req.query.sortBy

  const page = Number(req.params.number)
  if (isNaN(page) || page <= 0) return res.status(400).json({ error: 'invalid parameter' })

  const skipping = (page - 1) * defLimitEntriesPerPage

  try {
    const journeys = await Journey.aggregate([{ $sort: { [sortBy]: 1 } }, { $skip: skipping }, { $limit: defLimitEntriesPerPage }])
    if (journeys.length > 0) {
      return res.json(journeys)
    }
  } catch (e) {
    res.status(400).end()
  }

  return res.status(404).json({ error: 'page doesn\'t exist' })
})

journeyService.get('/total', async (req, res) => {
  const amount = await Journey.estimatedDocumentCount({})
  return res.json({ totalEntries: amount })
})

module.exports = journeyService