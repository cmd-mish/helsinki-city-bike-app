import axios from 'axios'
const baseURL = '/api/stations'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseURL}/${id}`)
  return response.data
}

const getTop5Return = async (id) => {
  const response = await axios.get(`${baseURL}/top5/return/${id}`)
  return response.data
}

const getTop5Departure = async (id) => {
  const response = await axios.get(`${baseURL}/top5/departure/${id}`)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, getOne, getTop5Return, getTop5Departure }