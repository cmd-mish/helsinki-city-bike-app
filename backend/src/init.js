require('dotenv').config()
const mongoose = require('mongoose')
const csv = require('csvtojson')
const cliProgress = require('cli-progress');
const Station = require('./models/station')
const Journey = require('./models/journey')

const DB_URI = process.env.DB_URI
const PATH_TO_STATIONS = './data/stations.csv'
const PATHS_TO_JOURNEYS = ['./data/2021-05.csv', './data/2021-06.csv', './data/2021-07.csv']

console.log('initiating import of data')

mongoose.connect(DB_URI)
  .then(() => {
    console.log(`connected to ${DB_URI}`)
  })
  .catch((error) => {
    console.log(`error occured: ${error}`)
  })

const exportStations = async (dataset) => {
  const stationProgress = new cliProgress.SingleBar({}, cliProgress.shades_classic)

  let count = 0
  const total = dataset.length
  stationProgress.start(total, count)

  for (let station of dataset) {
    const newStation = new Station(station)
    await newStation.save()
    count += 1
    stationProgress.update(count)
  }
  stationProgress.stop()
}

const exportJourneys = async (dataset) => {
  const journeyProgress = new cliProgress.SingleBar({}, cliProgress.shades_classic)

  let count = 0
  const total = dataset.length
  journeyProgress.start(total, count)

  for (let journey of dataset) {
    count += 1

    if (Number(journey.duration) >= 10 && Number(journey.covered_distance) >= 10) {
      const newJourney = new Journey(journey)
      await newJourney.save()
    }
    journeyProgress.update(count)
  }
  journeyProgress.stop()
}

const convertToJson = async (path, params) => {
  console.log(`converting file '${path}' to JSON`)
  return await csv(params).fromFile(path)
}

const eraseDataBase = async () => {
  console.log('Erasing database')
  await Station.deleteMany({})
  await Journey.deleteMany({})
}

const init = async () => {
  await eraseDataBase()

  // Export stations to DB
  const stations = await convertToJson(PATH_TO_STATIONS)
  await exportStations(stations)

  // Export journeys to DB
  let journeysJSON = []
  const journeyParams = {
    noheader: false,
    headers: [
      'departure', 'return', 'departure_station_id', 'departure_station_name',
      'return_station_id', 'return_station_name', 'covered_distance', 'duration'
    ]
  }

  for (path of PATHS_TO_JOURNEYS) {
    const newJSON = await convertToJson(path, journeyParams)
    journeysJSON = journeysJSON.concat(newJSON)
  }

  await exportJourneys(journeysJSON)

  await mongoose.connection.close()

}

init()