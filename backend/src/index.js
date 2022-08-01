require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const stationRouter = require('./services/stationService')

const app = express()
const DB_URI = process.env.DB_URI
const PORT = 3000

mongoose.connect(DB_URI)

app.use('/api/stations/', stationRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})