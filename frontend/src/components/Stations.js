import { useEffect, useState } from 'react'
import stationService from '../services/stations'
import Table from 'react-bootstrap/Table'
import Loader from './Loader'

const Stations = () => {
  const [stations, setStations] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    stationService
      .getAll()
      .then(response => setStations(response))
  }, [])

  if (stations.length < 1) return <div><Loader /></div>

  return (
    <div>
      <h2>Stations</h2>
      <div>
        filter stations by name&nbsp;
        <input type='text' onChange={(event) => setSearch(event.target.value)} />
      </div>
      <div className='mt-3'>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>FID</th>
              <th>Name</th>
              <th>ID</th>
              <th>Address</th>
              <th>Capacity</th>
            </tr>
          </thead>
          <tbody>
            {stations
              .filter(station => station.Name.toLowerCase().includes(search.toLowerCase()))
              .map(station => {
                return (
                  <tr key={station._id}>
                    <td>{station.FID}</td>
                    <td><a href={`./stations/${station.ID}`}>{station.Name}</a></td>
                    <td>{station.ID}</td>
                    <td>{station.Osoite}{station.Kaupunki ? `, ${station.Kaupunki}` : ''} </td>
                    <td>{station.Kapasiteet}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </div>

    </div>
  )
}

export default Stations