import {
  Routes, Route, Navigate
} from 'react-router-dom'
import Navigation from './components/Navigation'
import Stations from './components/Stations'
import Journeys from './components/Journeys'
import Station from './components/Station'

const App = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path='/' element={<Navigate replace to='/stations' />} />
        <Route path='/stations' element={<Stations />} />
        <Route path='/journeys' element={<Journeys />} />
        <Route path='/stations/:id' element={<Station />} />
      </Routes>
    </div>
  )
}

export default App