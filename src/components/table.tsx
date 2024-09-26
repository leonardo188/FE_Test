import React from 'react';

interface TableProps<T> {
    data: T[];
}

const Table = <T extends Record<string, any>>({ data }: TableProps<T>) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {Object.keys(data[0]).map((header) => (
            <th
              className='text-left items-start'
              key={header}
              style={{
                  border: '1px solid #ddd',
                  padding: '8px',
                  backgroundColor: '#f2f2f2',
              }} >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((cell, cellIndex) => (
              <td
                key={cellIndex}
                style={{
                    border: '1px solid #ddd',
                    padding: '8px',
                }} >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
