const stationRouter = require('express').Router()

stationRouter.post('/', async (req, res) => {
  const body = req.body
  console.log(body)
})

module.exports = stationRouter