import axios from 'axios'
const baseURL = '/api/journeys'

const totalPages = async () => {
  const response = await axios.get(`${baseURL}/pages`)
  return response.data
}

const getPage = async (page) => {
  const response = await axios.get(`${baseURL}/pages/${page}`)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { totalPages, getPage }