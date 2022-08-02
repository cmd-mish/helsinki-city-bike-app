import { useEffect, useState } from 'react'
import stationService from '../services/stations'

const Stations = () => {
  const [stations, setStations] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    stationService
      .getAll()
      .then(response => setStations(response))
  }, [])

  if (stations.length < 1) return <div>loading...</div>

  return (
    <div>
      <h2>Stations</h2>
      <div>
        filter stations by name
        <input type='text' onChange={(event) => setSearch(event.target.value)} />
      </div>
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
            .filter(station => station.Name.toLowerCase().includes(search.toLowerCase()))
            .map(station => {
              return (
                <tr key={station._id}>
                  <td>{station.FID}</td>
                  <td>{station.Name}</td>
                  <td>{station.Osoite}{station.Kaupunki ? `, ${station.Kaupunki}` : ''} </td>
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