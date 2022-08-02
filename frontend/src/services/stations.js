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

export default { getAll, getOne }