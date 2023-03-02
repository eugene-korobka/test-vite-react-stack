import { useTable } from 'react-table';
import type { ItemType } from 'sharedTypes/item.types';
import { EditItemWidget } from 'widgets/EditItemWidget/EditItemWidget';

import { AppTable } from 'components/AppTable';
import { RemoveItemWithEvent } from 'components/RemoveItemWithEvent';

import { ViewItemLink } from './ViewItemLink';

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
    headerClassName: 'min-w-70 w-1/10 p-3 text-center font-bold',
    cellClassName: 'min-w-70 w-1/10 p-3 text-end',
    Cell: ({ value }) => {
      return (
        <div className="flex gap-4 justify-end">
          <ViewItemLink itemId={value} />
          <EditItemWidget itemId={value} />
          <RemoveItemWithEvent itemId={value} />
        </div>
      );
    },
  },
];

const useItemsTableState = (props: ItemListProps) => {
  const { items } = props;

  const tableInstance = useTable({ columns, data: items });

  return tableInstance;
};

export function ItemsTable(props: ItemListProps) {
  const tableInstance = useItemsTableState(props);

  return <AppTable {...tableInstance} />;
}
