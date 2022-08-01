require('dotenv').config()
const mongoose = require('mongoose')
const csv = require('csvtojson')
const cliProgress = require('cli-progress');
const Station = require('./src/models/station')
const Journey = require('./src/models/journey')

const DB_URI = process.env.DB_URI
const PATH_TO_STATIONS = './data/stations.csv'
const PATHS_TO_JOURNEYS = ['./data/2021-05.csv', './data/2021-06.csv', './data/2021-07.csv']
const SPLIT_BUFFER_AT = 100

mongoose.connect(DB_URI)
  .then(() => {
    console.log(`connected to ${DB_URI}`)
  })
  .catch((error) => {
    console.log(`error occured: ${error}`)
  })

const exportStations = async (dataset) => {
  try {
    await Station.insertMany(dataset)
  } catch (error) {
    console.log(error)
  }
}

const exportJourneys = async (dataset) => {
  console.log('exporting journeys')
  const journeyProgress = new cliProgress.SingleBar({}, cliProgress.shades_classic)

  let count = 0
  let separatorCount = 0
  let bufferArray = []

  const total = dataset.length
  journeyProgress.start(total, count)

  for (let journey of dataset) {
    count += 1
    separatorCount += 1

    if (Number(journey.duration) >= 10 && Number(journey.covered_distance) >= 10) {
      bufferArray = bufferArray.concat(journey)
    }
    journeyProgress.update(count)

    if (separatorCount === SPLIT_BUFFER_AT) {
      try {
        await Journey.insertMany(bufferArray)
      } catch (error) {
        console.log(error)
      }

      bufferArray = []
      separatorCount = 0
    }
  }
  try {
    await Journey.insertMany(bufferArray)
  } catch (error) {
    console.log(error)
  }
  journeyProgress.stop()
}

const convertToJson = async (path, params) => {
  console.log(`converting file '${path}' to JSON`)
  return await csv(params).fromFile(path)
}

const eraseDataBase = async () => {
  console.log('erasing database...')
  try {
    await Station.deleteMany({})
  } catch (error) {
    console.log(error)
  }

  try {
    await Journey.deleteMany({})
  } catch (error) {
    console.log(error)
  }
}

const init = async () => {
  await eraseDataBase()

  console.log('initiating import of data to the database')
  console.log('this may take a while')

  // Export stations to DB
  const stations = await convertToJson(PATH_TO_STATIONS)
  await exportStations(stations)

  // Export journeys to DB
  const journeyParams = {
    noheader: false,
    headers: [
      'departure', 'return', 'departure_station_id', 'departure_station_name',
      'return_station_id', 'return_station_name', 'covered_distance', 'duration'
    ]
  }

  let index = 0
  for (path of PATHS_TO_JOURNEYS) {
    const newJSON = await convertToJson(path, journeyParams)
    index += 1
    console.log(`begining to export to database file ${index} or ${PATHS_TO_JOURNEYS.length}`)
    await exportJourneys(newJSON)
  }
  await mongoose.connection.close()
}

init()