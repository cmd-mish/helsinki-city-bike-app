import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import stationService from '../services/stations'

const Station = () => {
  const [station, setStation] = useState(null)

  const id = useParams().id

  useEffect(() => {
    stationService
      .getOne(id)
      .then(response => setStation(response))
  }, [id])

  if (station === null) return <div>loading...</div>

  return (
    <div>
      <h1>single station</h1>
      <ul>
        <li>name: {station.Name}</li>
        <li>address: {station.Osoite}</li>
        <li>total number of journeys starting from the station: {station.startJourneyCount}</li>
        <li>total number of journeys ending at the station: {station.endJourneyCount}</li>
      </ul>
    </div>
  )
}

export default Station