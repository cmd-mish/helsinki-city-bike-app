import {
  Routes, Route, Navigate
} from 'react-router-dom'
import Navigation from './components/Navigation'
import Stations from './components/Stations'
import Journeys from './components/Journeys'
import Station from './components/Station'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className="container">
      <Navigation />
      <div style={{ marginTop: '65px' }}>
        <Routes>
          <Route path='/' element={<Navigate replace to='/stations' />} />
          <Route path='/stations' element={<Stations />} />
          <Route path='/journeys' element={<Navigate replace to='/journeys/1' />} />
          <Route path='/journeys/:page' element={<Journeys />} />
          <Route path='/stations/:id' element={<Station />} />
        </Routes>
      </div>
      <Footer />
    </div >
  )
}

export default App