import { useEffect, useState } from 'react'
import stationService from '../services/stations'

const Stations = () => {
  const [stations, setStations] = useState([])

  useEffect(() => {
    stationService
      .getAll()
      .then(response => setStations(response))
  }, [])

  console.log(stations)
  return (
    <div>
      <h2>Stations</h2>
      <table>
        <tbody>
          <tr>
            <th>FID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Operator</th>
            <th>Capacity</th>
            <th>Coordinates</th>
          </tr>
          {stations
            .map(station => {
              return (
                <tr key={station._id}>
                  <td>{station.FID}</td>
                  <td>{station.Name}</td>
                  <td>{station.Osoite}, {station.Kaupunki}</td>
                  <td>{station.Operaattor}</td>
                  <td>{station.Kapasiteet}</td>
                  <td>x: {station.x}, y: {station.y}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Stations