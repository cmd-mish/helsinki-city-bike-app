const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  departure: {
    type: Date,
    required: true,
  },
  return: {
    type: Date,
    required: true,
  },
  departure_station_id: {
    type: Number,
    required: true,
  },
  departure_station_name: {
    type: String,
    required: false
  },
  return_station_id: {
    type: Number,
    required: true,
  },
  return_station_name: {
    type: String,
    required: false
  },
  covered_distance: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  }
})

module.exports = mongoose.model('Journey', schema)