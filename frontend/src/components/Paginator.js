const Paginator = ({ changePage, currentPage, totalPages }) => {
  return (
    <div>
      <button onClick={() => changePage(-1)}>previous page</button>
      &nbsp;you are on page {currentPage} / {totalPages}&nbsp;
      <button onClick={() => changePage(1)}>next page</button>
    </div>
  )
}

export default Paginator