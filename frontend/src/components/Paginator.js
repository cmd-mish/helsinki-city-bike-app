import Button from 'react-bootstrap/Button'

const Paginator = ({ changePage, currentPage, totalPages }) => {
  return (
    <div className="text-center mt-2 mb-4">
      {currentPage === 1 ?
        <span>
          <Button variant="outline-dark" size="sm" disabled>first page</Button> &nbsp;
          <Button variant="outline-dark" size="sm" disabled>previous page</Button>
        </span>
        :
        <span>
          <Button variant="outline-dark" size="sm" onClick={() => changePage('first')}>first page</Button>&nbsp;
          <Button variant="outline-dark" size="sm" onClick={() => changePage(-1)}>previous page</Button>
        </span>
      }
      &nbsp;you are on page {currentPage} / {totalPages}&nbsp;

      {currentPage === totalPages ?
        <span>
          <Button variant="outline-dark" size="sm" disabled>next page</Button>&nbsp;
          <Button variant="outline-dark" size="sm" disabled>last page</Button>
        </span>
        :
        <span>
          <Button variant="outline-dark" size="sm" onClick={() => changePage(1)}>next page</Button>&nbsp;
          <Button variant="outline-dark" size="sm" onClick={() => changePage('last')}>last page</Button>
        </span>
      }
    </div>
  )
}

export default Paginator