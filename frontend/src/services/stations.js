import axios from 'axios'
const baseURL = '/api/stations'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

export default { getAll }