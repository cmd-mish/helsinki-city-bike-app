require('dotenv').config()
const express = require('express')
const csv = require('csvtojson')

const app = express()
const PORT = 3000

const csvFile = './data/stations.csv'

app.get('/api/stations', (req, res) => {
  csv()
    .fromFile(csvFile)
    .then((obj) => {
      return res.json(obj)
    })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})