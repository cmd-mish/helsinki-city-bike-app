import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <div>
      <ul>
        <li><Link to='/stations'>stations</Link></li>
        <li><Link to='/journeys'>journeys</Link></li>
      </ul>
    </div>
  )

}

export default Navigation