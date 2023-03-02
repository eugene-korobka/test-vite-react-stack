const TableLoadingRow = () => {
  return (
    <tr className="border-b border-solid border-gray-700 last:border-none">
      <td className="p-3 text-center" colSpan={999}>
        Loading...
      </td>
    </tr>
  );
};

const TableNoDataRow = () => {
  return (
    <tr className="border-b border-solid border-gray-700 last:border-none">
      <td className="p-3 text-center" colSpan={999}>
        No data
      </td>
    </tr>
  );
};

function useAppTableState(props) {
  const { isLoading, getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = props;

  const isEmpty = !isLoading && !rows.length;
  const hasRows = !isEmpty;

  return {
    isLoading,
    isEmpty,
    hasRows,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  };
}

export const AppTable = (props) => {
  const { isLoading, isEmpty, hasRows, getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useAppTableState(props);

  return (
    <table className="w-full" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr className="border-b-2 border-solid border-black" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th className={column.headerClassName} {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {isLoading && <TableLoadingRow />}
        {isEmpty && <TableNoDataRow />}
        {hasRows &&
          rows.map((row) => {
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
};
