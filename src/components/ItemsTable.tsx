import { useTable } from 'react-table';

import { RemoveItemButtonWithConfirmWidget } from 'pages/ItemsList/RemoveItemButtonWidget/RemoveItemButtonWithConfirmWidget';

import type { ItemType } from 'store/types';

interface ItemListProps {
  items: ItemType[];
  isLoading?: boolean;
}

const columns = [
  {
    Header: 'Title',
    accessor: 'title',
    headerClassName: 'min-w-40 w-3/10 p-3 text-start font-bold',
    cellClassName: 'min-w-40 w-3/10 p-3 text-start',
  },
  {
    Header: 'Description',
    accessor: 'description',
    headerClassName: 'p-3 text-start font-bold',
    cellClassName: 'p-3 text-start',
  },
  {
    Header: 'Actions',
    accessor: 'id',
    headerClassName: 'min-w-24 w-1/10 p-3 text-start font-bold',
    cellClassName: 'min-w-24 w-1/10 p-3 text-end',
    Cell: ({ value }) => {
      return <RemoveItemButtonWithConfirmWidget itemId={value} />;
    },
  },
];

const useItemsTableState = (props: ItemListProps) => {
  const { items } = props;

  const tableInstance = useTable({ columns, data: items });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  };
};

export function ItemsTable(props: ItemListProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useItemsTableState(props);

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
