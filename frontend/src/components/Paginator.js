import Button from 'react-bootstrap/Button'

const Paginator = ({ changePage, currentPage, totalPages }) => {
  return (
    <div className="text-center mt-2 mb-4">
      <Button variant="outline-dark" size="sm" onClick={() => changePage('first')}>first page</Button>&nbsp;
      <Button variant="outline-dark" size="sm" onClick={() => changePage(-1)}>previous page</Button>
      &nbsp;you are on page {currentPage} / {totalPages}&nbsp;
      <Button variant="outline-dark" size="sm" onClick={() => changePage(1)}>next page</Button>&nbsp;
      <Button variant="outline-dark" size="sm" onClick={() => changePage('last')}>last page</Button>
    </div>
  )
}

export default Paginator