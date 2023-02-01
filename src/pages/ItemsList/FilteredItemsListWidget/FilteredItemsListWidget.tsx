import { useMemo } from 'react';

import { ItemsListTitleFilter } from 'pages/ItemsList/FilteredItemsListWidget/components/ItemsListTitleFilter';
import { useFetchItemsQuery } from 'pages/ItemsList/FilteredItemsListWidget/store/items.api';
import { itemsListFilterSelectors } from 'pages/ItemsList/FilteredItemsListWidget/store/itemsListFilter.selector';
import { titleFilterInitialValue } from 'pages/ItemsList/FilteredItemsListWidget/store/itemsListFilter.slice';

import { ItemsList } from 'components/ItemsList';

import { useAppSelector } from 'store/hooks';

const useFilteredItemsListWidgetState = () => {
  const { data, isFetching } = useFetchItemsQuery(undefined);

  const titleFilter = useAppSelector(itemsListFilterSelectors.selectTitleFilter);

  const filteredItems = useMemo(() => {
    if (!data?.length) {
      return [];
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
      <ItemsListTitleFilter />
      <ItemsList isLoading={isFetching} items={items} />
    </section>
  );
};
