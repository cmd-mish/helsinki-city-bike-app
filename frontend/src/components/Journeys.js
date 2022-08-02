import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import journeyService from '../services/journey'

const Journeys = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [journeys, setJourneys] = useState([])
  const pageParam = useParams().page
  const navigate = useNavigate()

  useEffect(() => {
    setCurrentPage(Number(pageParam))
    journeyService
      .getPage(pageParam)
      .then(response => setJourneys(response))
  }, [pageParam])

  const changePage = (diff) => {
    const pageToSet = currentPage + diff
    if (!isNaN(pageToSet) && pageToSet > 0) {
      navigate(`/journeys/${pageToSet}`)
    }
  }

  const parseDate = (date) => {
    const dateObj = new Date(date)
    return dateObj.toGMTString()
  }

  if (isNaN(currentPage) || currentPage <= 0) return <div>page doesn't exist</div>
  if (journeys.length < 1) return <div>loading...</div>

  return (
    <div>
      <h2>Journeys</h2>
      <button onClick={() => changePage(-1)}>previous page</button>
      &nbsp;you are on page {currentPage}&nbsp;
      <button onClick={() => changePage(1)}>next page</button>
      <table>
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
                  <td>{journey.departure_station_name} (id: {journey.departure_station_id})</td>
                  <td>{journey.return_station_name} (id: {journey.return_station_id})</td>
                  <td>{journey.covered_distance}</td>
                  <td>{journey.duration}</td>
                </tr>
              )
            })}
        </tbody>
      </table>

      <button onClick={() => changePage(-1)}>previous page</button>
      &nbsp;you are on page {currentPage}&nbsp;
      <button onClick={() => changePage(1)}>next page</button>
    </div>
  )
}

export default Journeys