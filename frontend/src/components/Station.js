import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import stationService from '../services/stations'
import Loader from './Loader'
import Map from './Map'
import { Card, Table, Button, Container, Row, Col } from 'react-bootstrap'

const Station = () => {
  const [station, setStation] = useState(null)
  const [top5Return, setTop5Return] = useState(null)
  const [top5Departure, setTop5Departure] = useState(null)
  const [error, setError] = useState(null)

  const id = useParams().id
  const navigate = useNavigate()

  useEffect(() => {
    stationService
      .getOne(id)
      .then(response => setStation(response))
      .catch(error => setError(error))

    stationService
      .getTop5Return(id)
      .then(response => setTop5Return(response))
      .catch(error => console.log(error))

    stationService
      .getTop5Departure(id)
      .then(response => setTop5Departure(response))
      .catch(error => console.log(error))
  }, [id])

  if (error) return <div>{error.message}</div>
  if (station === null) return <div><Loader /></div>

  return (
    <div className='pt-4'>
      <Card>
        <Card.Header as="h2">
          {station.Nimi} / {station.Namn}
        </Card.Header>
        <Card.Body>
          <Container>
            <Row className="justify-content-md-center">
              <Col>
                <Table bordered size="sm">
                  <thead>
                    <tr>
                      <th colSpan={2}>Information</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>FID</td>
                      <td>{station.FID}</td>
                    </tr>
                    <tr>
                      <td>ID</td>
                      <td>{station.ID}</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>
                        {station.Osoite}{station.Kaupunki ? `, ${station.Kaupunki}` : ''}
                        &nbsp;/&nbsp;
                        {station.Adress}{station.Stad ? `, ${station.Stad}` : ''}
                      </td>
                    </tr>
                    <tr>
                      <td>Capacity</td>
                      <td>{station.Kapasiteet}</td>
                    </tr>
                    {station.Operaattor ?
                      <tr>
                        <td>Operator</td>
                        <td>{station.Operaattor}</td>
                      </tr>
                      : null}
                    <tr>
                      <td>Journeys from this station</td>
                      <td>{station.startJourneyCount}</td>
                    </tr>
                    <tr>
                      <td>Journeys to this station</td>
                      <td>{station.endJourneyCount}</td>
                    </tr>
                    {station.avgStart[0] ?
                      <tr>
                        <td>Average distance of a journey from this staion</td>
                        <td>{Math.round(station.avgStart[0].avg)} m</td>
                      </tr>
                      : null}
                    {station.avgEnd[0] ?
                      <tr>
                        <td>Average distance of a journey to this staion</td>
                        <td>{Math.round(station.avgEnd[0].avg)} m</td>
                      </tr>
                      : null}
                  </tbody>
                </Table>
              </Col>
              <Col>
                <Map x={station.x} y={station.y} />
              </Col>
            </Row>

            <Row className="justify-content-md-center pt-3">
              <Col>
                <h6>Top 5 stations with journeys that started at this staion</h6>
                {top5Departure ?
                  <Table bordered size="sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Number of journeys</th>
                      </tr>
                      {top5Departure.map(station => {
                        return (
                          <tr key={station._id}>
                            <td>
                              <a href={`./${station._id}`}>{station.return_station_name}</a>
                            </td>
                            <td>
                              {station.count}
                            </td>
                          </tr>
                        )
                      })}
                    </thead>
                  </Table>
                  : 'Couldn\'t load top 5 departure stations'}
              </Col>
              <Col>
                <h6>Top 5 stations with journeys that ended at this staion</h6>
                {top5Return ?
                  <Table bordered size="sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Number of journeys</th>
                      </tr>
                      {top5Return.map(station => {
                        return (
                          <tr key={station._id}>
                            <td>
                              <a href={`./${station._id}`}>{station.departure_station_name}</a>
                            </td>
                            <td>
                              {station.count}
                            </td>
                          </tr>
                        )
                      })}
                    </thead>
                  </Table>
                  : 'Couldn\'t load top 5 return stations'}
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
      <div className="text-center mt-2 mb-4">
        <Button variant="outline-dark" onClick={() => navigate(-1)}>Back</Button>
      </div>
    </div >
  )
}

export default Station