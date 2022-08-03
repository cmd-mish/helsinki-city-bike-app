const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  departure: {
    type: Date,
    required: true,
    index: true,
  },
  return: {
    type: Date,
    required: true,
    index: true,
  },
  departure_station_id: {
    type: Number,
    required: true,
    index: true,
  },
  departure_station_name: {
    type: String,
    required: false,
    index: true,
  },
  return_station_id: {
    type: Number,
    required: true,
    index: true,
  },
  return_station_name: {
    type: String,
    required: false,
    index: true,
  },
  covered_distance: {
    type: Number,
    required: true,
    index: true,
  },
  duration: {
    type: Number,
    required: true,
    index: true,
  }
})

module.exports = mongoose.model('Journey', schema)