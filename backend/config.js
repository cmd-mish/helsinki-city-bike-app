require('dotenv').config()

const DB_URI = process.env.DB_URI
const PORT = 3001

const PATH_TO_STATIONS = './data/stations.csv'
const PATHS_TO_JOURNEYS = ['./data/2021-05.csv', './data/2021-06.csv', './data/2021-07.csv']
const SPLIT_BUFFER_AT = 100

module.exports = {
  DB_URI,
  PORT,
  PATH_TO_STATIONS,
  PATHS_TO_JOURNEYS,
  SPLIT_BUFFER_AT
}