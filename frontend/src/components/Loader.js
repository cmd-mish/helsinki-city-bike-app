import Spinner from 'react-bootstrap/Spinner'

const Loader = () => {
  return (
    <div className="text-center mt-4 mb-4">
      <Spinner animation="border" />
      <p>Loading data...</p>
    </div>
  )
}

export default Loader