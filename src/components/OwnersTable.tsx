import { useTable } from 'react-table';
import type { OwnerType } from 'sharedTypes/owner.types';

import { AppTable } from './AppTable';
import { ViewOwnerLink } from './ViewOwnerLink';

interface OwnersListProps {
  items: OwnerType[];
  isLoading?: boolean;
}

const columns = [
  {
    Header: 'First name',
    accessor: 'firstName',
    headerClassName: 'p-3 text-start font-bold',
    cellClassName: 'p-3 text-start',
  },
  {
    Header: 'Last name',
    accessor: 'lastName',
    headerClassName: 'p-3 text-start font-bold',
    cellClassName: 'p-3 text-start',
  },
  {
    Header: 'Email',
    accessor: 'email',
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
          <ViewOwnerLink ownerId={value} />
        </div>
      );
    },
  },
];

function useOwnersTableState(props: OwnersListProps) {
  const { items } = props;

  const tableInstance = useTable({ columns, data: items });

  return tableInstance;
};

export const OwnersTable = (props: OwnersListProps) => {
  const tableInstance = useOwnersTableState(props);

  return (
    <AppTable {...tableInstance} />
  );
}
