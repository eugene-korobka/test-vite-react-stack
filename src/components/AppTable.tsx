export const AppTable = (props) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = props;

  return (
    <table className="w-full" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr className="border-b-2 border-solid border-black" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                className={column.headerClassName}
                {...column.getHeaderProps()}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr className="border-b border-solid border-gray-700 last:border-none" {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td className={cell.column.cellClassName} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

