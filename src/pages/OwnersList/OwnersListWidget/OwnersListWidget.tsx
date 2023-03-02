import { useFetchOwnersQuery } from './store/owners.fetch.api';
import { OwnersTable } from './OwnersTable';

const initialItems = [];

const useOwnersListWidgetState = () => {
  const { data, isFetching } = useFetchOwnersQuery(undefined);

  return {
    items: data ?? initialItems,
    isFetching,
  };
};

export const OwnersListWidget = () => {
  const { items } = useOwnersListWidgetState();

  return (
    <section className="w-full">
      <OwnersTable items={items} />
    </section>
  );
};
