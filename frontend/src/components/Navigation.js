import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Navigation = () => {
  return (
    <div>
      <Navbar bg='dark' variant='dark' fixed='top'>
        <Container>
          <Navbar.Brand href='/'>Helsinki City Bike App</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link href='/stations'>Stations</Nav.Link>
            <Nav.Link href='/journeys'>Journeys</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navigation