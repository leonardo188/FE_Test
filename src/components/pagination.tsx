import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useEffect, useState } from 'react';

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  row: number[];
  onPageChange: (page: number) => void;
  onRowChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPage, currentPage, row, onPageChange, onRowChange }) => {
  const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRows = Number(e.target.value);
    onRowChange(selectedRows)
  }

  const pageNumbers = Array.from({ length: totalPage }, (_, index) => index + 1);

  return (
    <div className="flex items-center justify-end p-4">
      <div className="flex items-center">
        <select
          id="entries-per-page"
          onChange={handleEntriesChange}
          className="border border-gray-300 rounded-md px-2 py-1"
        >
          { row.map((option) => (
              <option key={option} value={option}>
                  {`Show - ${option} entries`}
              </option>
          ))}
        </select>
      </div>
      <div className='flex items-center'>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-1 py-1 border border-gray-300 rounded-md mx-1"
        >
          <Icon path={mdiChevronLeft} size={1} color="black" />
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-1 border border-gray-300 rounded-md mx-1 ${currentPage === number ? 'bg-gray-300' : ''}`}
          >
            {number}
          </button>
          ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPage}
          className="px-1 py-1 border border-gray-300 rounded-md mx-1"
        >
          <Icon path={mdiChevronRight} size={1} color="black" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
