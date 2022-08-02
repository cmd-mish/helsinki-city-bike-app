import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Journeys = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageParam = useParams().page
  const navigate = useNavigate()

  useEffect(() => {
    setCurrentPage(Number(pageParam))
  }, [pageParam])

  const changePage = (diff) => {
    const pageToSet = currentPage + diff
    if (!isNaN(pageToSet) && pageToSet > 0) {
      navigate(`/journeys/${pageToSet}`)
    }
  }

  if (isNaN(currentPage) || currentPage <= 0) return <div>page doesn't exist</div>

  return (
    <div>
      <h2>Journeys</h2>
      <button onClick={() => changePage(-1)}>previous page</button>
      &nbsp;you are on page {currentPage}&nbsp;
      <button onClick={() => changePage(1)}>next page</button>
    </div>
  )
}

export default Journeys