require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const stationService = require('./services/stationService')
const journeyService = require('./services/journeyService')

const app = express()
const DB_URI = process.env.DB_URI
const PORT = 3001

mongoose.connect(DB_URI)
  .then(() => {
    console.log(`connected to ${DB_URI}`)
  })
  .catch((error) => {
    console.log(`error occured: ${error}`)
  })

app.use('/api/stations/', stationService)
app.use('/api/journeys/', journeyService)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})