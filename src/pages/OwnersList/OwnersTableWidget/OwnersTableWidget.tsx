import { useTable } from 'react-table';
import { EditOwnerWidget } from 'widgets/EditOwnerWidget/EditOwnerWidget';
import { RemoveOwnerWithEvent } from 'widgets/RemoveOwnerWithEvent.widget';

import { AppTable } from 'components/AppTable';

import { useFetchOwnersQuery } from './store/owners.fetch.api';
import { ViewOwnerLink } from './ViewOwnerLink';

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
          <EditOwnerWidget ownerId={value} />
          <RemoveOwnerWithEvent ownerId={value} />
        </div>
      );
    },
  },
];

const initialData = [];

const useOwnersTableWidgetState = () => {
  const { data = initialData, isFetching } = useFetchOwnersQuery(undefined);

  const isLoading = isFetching;

  const tableInstance = useTable({ columns, data });

  return {
    isLoading,
    ...tableInstance,
  };
};

export const OwnersTableWidget = () => {
  const tableProps = useOwnersTableWidgetState();

  return (
    <section className="w-full">
      <AppTable {...tableProps} />;
    </section>
  );
};
