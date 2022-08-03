import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import stationService from '../services/stations'
import Loader from './Loader'
import Map from './Map'
import { Card, Table, Button, Container, Row, Col } from 'react-bootstrap'

const Station = () => {
  const [station, setStation] = useState(null)

  const id = useParams().id
  const navigate = useNavigate()

  useEffect(() => {
    stationService
      .getOne(id)
      .then(response => setStation(response))
  }, [id])

  if (station === null) return <div><Loader /></div>

  return (
    <div>
      <Card>
        <Card.Header as="h2">
          {station.Nimi} / {station.Namn}
        </Card.Header>
        <Card.Body>
          <Container>
            <Row>
              <Col>
                <Table bordered size="sm" style={{ maxWidth: '40rem' }}>
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
                  </tbody>
                </Table>
              </Col>
              <Col>
                <Map x={station.x} y={station.y} />
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
      <div className="text-center mt-2 mb-4">
        <Button variant="outline-dark" onClick={() => navigate('/stations')}>Return to the list</Button>
      </div>
    </div >
  )
}

export default Station