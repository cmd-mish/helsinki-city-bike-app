import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useLocation } from 'react-router-dom'

const Navigation = () => {
  const path = useLocation().pathname

  return (
    <div>
      <Navbar bg='dark' variant='dark' fixed='top'>
        <Container>
          <Navbar.Brand href='/'>Helsinki City Bike App</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link href='/stations' className={`${path.includes('stations') ? 'active' : ''}`}>Stations</Nav.Link>
            <Nav.Link href='/journeys' className={`${path.includes('journeys') ? 'active' : ''}`}>Journeys</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navigation