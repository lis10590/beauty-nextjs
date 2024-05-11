const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const buttonClasses =
    "px-3 py-2 rounded text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

  // Calculate visible page window
  const windowSize = 5;
  let startPage = Math.max(1, currentPage - Math.floor(windowSize / 2));
  let endPage = Math.min(totalPages, currentPage + Math.floor(windowSize / 2));

  // Adjust window edges to ensure at least 3 pages are shown
  if (endPage - startPage < windowSize - 1) {
    if (currentPage <= totalPages / 2) {
      endPage = Math.min(totalPages, startPage + windowSize - 1);
    } else {
      startPage = Math.max(1, endPage - windowSize + 1);
    }
  }

  // Generate page numbers
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <nav className="flex justify-center mt-6">
      <ul className="inline-flex items-center rounded-md shadow">
        <li className="disabled:opacity-50 mr-2">
          <button
            className={`${buttonClasses} disabled:cursor-not-allowed ${
              isPrevDisabled ? "bg-gray-300 cursor-not-allowed" : ""
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={isPrevDisabled}
          >
            Previous
          </button>
        </li>
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`mr-2 ${
              currentPage === pageNumber ? "bg-indigo-500 text-white" : ""
            }`}
          >
            <button
              className={buttonClasses}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li className="disabled:opacity-50">
          <button
            className={`${buttonClasses} disabled:cursor-not-allowed ${
              isNextDisabled ? "bg-gray-300 cursor-not-allowed" : ""
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={isNextDisabled}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
