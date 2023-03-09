import { useMemo } from 'react';

import { useFetchItemsQuery } from 'pages/ItemsList/FilteredItemsListWidget/store/fetchItems.api';
import { itemsListFilterSelectors } from 'pages/ItemsList/FilteredItemsListWidget/store/itemsListFilter.selector';
import { titleFilterInitialValue } from 'pages/ItemsList/FilteredItemsListWidget/store/itemsListFilter.slice';

import { useAppSelector } from 'store/hooks';

import { ItemsTable } from './components/ItemsTable';

const initialItems = [];

const useFilteredItemsListWidgetState = () => {
  const { data, isFetching } = useFetchItemsQuery(undefined);

  const titleFilter = useAppSelector(itemsListFilterSelectors.selectTitleFilter);

  const filteredItems = useMemo(() => {
    if (!data?.length) {
      return initialItems;
    }

    if (titleFilter === titleFilterInitialValue) {
      return data;
    }

    return data.filter((item) => item.title === titleFilter);
  }, [data, titleFilter]);

  return {
    items: filteredItems,
    isFetching,
  };
};

export const FilteredItemsListWidget = () => {
  const { items, isFetching } = useFilteredItemsListWidgetState();

  return (
    <section className="w-full">
      <ItemsTable isLoading={isFetching} items={items} />
    </section>
  );
};
