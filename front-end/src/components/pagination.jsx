const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  totalRecords,
}) => {
  const maxPagesToShow = 16;

  const handleSelectPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  return (
    <nav className="mt-2 w-full flex justify-center relative">
      <ul className="inline-flex -space-x-px text-base h-10">
        <li onClick={handlePreviousPage}>
          <a
            href="#"
            className="flex items-center justify-center px-4 h-10 text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-slate-100 hover:text-gray-700"
          >
            Previous
          </a>
        </li>

        {Array.from(
          { length: endPage - startPage + 1 },
          (_, index) => startPage + index
        ).map((pageIndex) => (
          <li key={pageIndex} onClick={() => handleSelectPage(pageIndex)}>
            <a
              href="#"
              className={
                "flex items-center justify-center px-4 h-10 border border-e-0 border-gray-300 " +
                (currentPage === pageIndex
                  ? "bg-[#635bff] text-white"
                  : "bg-white text-gray-500 hover:bg-slate-100 hover:text-gray-700")
              }
            >
              {pageIndex}
            </a>
          </li>
        ))}

        <li onClick={handleNextPage}>
          <a
            href="#"
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
          >
            Next
          </a>
        </li>
      </ul>

      <div className="absolute top-2.5 right-2 text-gray-800 text-sm">{`${totalPages} pages`}</div>
    </nav>
  );
};

export default Pagination;
