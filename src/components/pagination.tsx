import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useEffect, useState } from 'react';

interface PaginationProps {
  totalEntries: number;
  entriesPerPageOptions: number[];
}

const Pagination: React.FC<PaginationProps> = ({ totalEntries, entriesPerPageOptions }) => {
  const [entriesPerPage, setEntriesPerPage] = useState(entriesPerPageOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(totalEntries / entriesPerPage));

  useEffect(() => {
      setTotalPages(Math.ceil(totalEntries / entriesPerPage));
  }, [totalEntries, entriesPerPage]);

  const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setEntriesPerPage(Number(e.target.value));
      setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages) {
          setCurrentPage(page);
      }
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex items-center justify-end p-4">
      <div className="flex items-center">
        <select
          id="entries-per-page"
          value={entriesPerPage}
          onChange={handleEntriesChange}
          className="border border-gray-300 rounded-md px-2 py-1"
        >
          {entriesPerPageOptions.map((option) => (
              <option key={option} value={option}>
                  {`Show - ${option} entries`}
              </option>
          ))}
        </select>
      </div>
      <div className='flex items-center'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-1 py-1 border border-gray-300 rounded-md mx-1"
        >
          <Icon path={mdiChevronLeft} size={1} color="black" />
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`px-3 py-1 border border-gray-300 rounded-md mx-1 ${currentPage === number ? 'bg-gray-300' : ''}`}
          >
            {number}
          </button>
          ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-1 py-1 border border-gray-300 rounded-md mx-1"
        >
          <Icon path={mdiChevronRight} size={1} color="black" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
