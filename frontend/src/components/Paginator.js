import Button from 'react-bootstrap/Button'

const Paginator = ({ changePage, currentPage, totalPages }) => {
  return (
    <div className="container text-center mt-2 mb-4">
      <div class="row">
        <div class="col">
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
        </div>
        <div class="col">
          {currentPage} / {totalPages}
        </div>

        <div class="col">
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
      </div>
    </div>
  )
}

export default Paginator