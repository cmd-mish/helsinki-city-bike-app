import {
  Routes, Route, useMatch, Navigate, useNavigate, useLocation
} from 'react-router-dom'
import Navigation from './components/Navigation'
import Stations from './components/Stations'
import Journeys from './components/Journeys'

const App = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path='/' element={<Navigate replace to='/stations' />} />
        <Route path='/stations' element={<Stations />} />
        <Route path='/journeys' element={<Journeys />} />
      </Routes>
    </div>
  )
}

export default App