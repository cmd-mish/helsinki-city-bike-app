import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import stationService from '../services/stations'
import Loader from './Loader'

const Station = () => {
  const [station, setStation] = useState(null)

  const id = useParams().id

  useEffect(() => {
    stationService
      .getOne(id)
      .then(response => setStation(response))
  }, [id])

  if (station === null) return <div><Loader /></div>

  return (
    <div>
      <h1>single station</h1>
      <ul>
        <li>name: {station.Nimi} / {station.Namn}</li>
        <li>
          address:&nbsp;
          {station.Osoite}{station.Kaupunki ? `, ${station.Kaupunki}` : ''}
          &nbsp;/&nbsp;
          {station.Adress}{station.Stad ? `, ${station.Stad}` : ''}
        </li>
        <li>capacity: {station.Kapasiteet}</li>
        <li>journeys starting from the station: {station.startJourneyCount}</li>
        <li>journeys ending at the station: {station.endJourneyCount}</li>
      </ul>
    </div>
  )
}

export default Station