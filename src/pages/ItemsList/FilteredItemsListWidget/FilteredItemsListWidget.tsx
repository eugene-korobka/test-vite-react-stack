import { useMemo } from 'react';

import { CreateItemWidgetV2 } from 'pages/ItemsList/CreateItemWidget/CreateItemWidgetV2';
import { ItemsListTitleFilter } from 'pages/ItemsList/FilteredItemsListWidget/components/ItemsListTitleFilter';
import { useFetchItemsQuery } from 'pages/ItemsList/FilteredItemsListWidget/store/items.fetch.api';
import { itemsListFilterSelectors } from 'pages/ItemsList/FilteredItemsListWidget/store/itemsListFilter.selector';
import { titleFilterInitialValue } from 'pages/ItemsList/FilteredItemsListWidget/store/itemsListFilter.slice';

import { ItemsTable } from 'components/ItemsTable';

import { useAppSelector } from 'store/hooks';

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
  const { items } = useFilteredItemsListWidgetState();

  return (
    <section className="w-full">
      <div className="flex justify-between items-center mb-4">
        <ItemsListTitleFilter />
        <CreateItemWidgetV2 />
      </div>
      <ItemsTable items={items} />
    </section>
  );
};
