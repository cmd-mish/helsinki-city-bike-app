import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import journeyService from '../services/journey'
import Paginator from './Paginator'
import Table from 'react-bootstrap/Table'
import Loader from './Loader'

const Journeys = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [journeys, setJourneys] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const pageParam = useParams().page
  const navigate = useNavigate()

  useEffect(() => {
    setCurrentPage(Number(pageParam))
    journeyService
      .getPage(pageParam)
      .then(response => setJourneys(response))
  }, [pageParam])

  useEffect(() => {
    journeyService
      .totalPages()
      .then(response => setTotalPages(Number(response.totalPages)))
  }, [])

  const changePage = (diff) => {
    const pageToSet = currentPage + diff
    if (!isNaN(pageToSet) && pageToSet > 0 && pageToSet < totalPages) {
      setJourneys([])
      navigate(`/journeys/${pageToSet}`)
    }
  }

  const parseDate = (date) => {
    const dateObj = new Date(date)
    return dateObj.toGMTString()
  }


  if (!totalPages) return <div><Loader /></div>
  if (isNaN(currentPage) || currentPage <= 0 || currentPage > totalPages)
    return <div>page doesn't exist</div>
  if (journeys.length === 0) return <div><Loader /></div>

  return (
    <div>
      <h2>Journeys</h2>
      <Paginator changePage={changePage} currentPage={currentPage} totalPages={totalPages} />
      <div className='mt-3'>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <th>Departure time</th>
              <th>Return time</th>
              <th>Departure station</th>
              <th>Return station</th>
              <th>Distance (m)</th>
              <th>Duration (sec)</th>
            </tr>
            {journeys
              .map(journey => {
                return (
                  <tr key={journey._id}>
                    <td>{parseDate(journey.departure)}</td>
                    <td>{parseDate(journey.return)}</td>
                    <td><Link to={`/stations/${journey.departure_station_id}`}>{journey.departure_station_name}</Link></td>
                    <td><Link to={`/stations/${journey.return_station_id}`}>{journey.return_station_name}</Link></td>
                    <td>{journey.covered_distance}</td>
                    <td>{journey.duration}</td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
      </div>

      <Paginator changePage={changePage} currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}

export default Journeys