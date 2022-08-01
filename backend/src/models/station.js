const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  FID: {
    type: Number,
    required: true,
    unique: true,
  },
  ID: {
    type: Number,
    required: true,
    unique: true,
  },
  Nimi: {
    type: String,
    required: true,
  },
  Namn: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Osoite: {
    type: String,
    required: true,
  },
  Adress: {
    type: String,
    required: true,
  },
  Kaupunki: {
    type: String,
    required: false,
  },
  Stad: {
    type: String,
    required: false,
  },
  Operaattor: {
    type: String,
    required: false,
  },
  Kapasiteet: {
    type: Number,
    required: true,
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  }
})

module.exports = mongoose.model('Station', schema)