import { useMemo } from 'react';

import { itemsListFilterSelectors } from 'pages/ItemsList/ItemsListFilterWidget/store/itemsListFilter.selector';
import { titleFilterInitialValue } from 'pages/ItemsList/ItemsListFilterWidget/store/itemsListFilter.slice';
import { useFetchItemsQuery } from 'pages/ItemsList/ItemsListWidget/store/items.api';
import { ItemType } from 'pages/ItemsList/ItemsListWidget/store/types';

import { useAppSelector } from 'store/hooks';

const ItemsListItem = ({ item }: { item: ItemType }) => {
  return (
    <li className="flex border-b border-solid border-gray-700 last:border-none">
      <div className="basis-1/3 p-3">{item.title}</div>
      <div className="basis-2/3 p-3">{item.description}</div>
    </li>
  );
};

const useItemListWidgetState = () => {
  const { data, isFetching } = useFetchItemsQuery(undefined);

  const noData = !isFetching && !data?.length;

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

  const hasItems = !noData && !!filteredItems.length;

  return {
    items: filteredItems,
    isFetching,
    noData,
    hasItems,
  };
};

export const ItemsListWidget = () => {
  const { items, isFetching, noData, hasItems } = useItemListWidgetState();

  return (
    <ul className="w-full">
      <li className="flex border-b-2 border-solid border-black">
        <div className="basis-1/3 p-3 font-bold">Title</div>
        <div className="basis-2/3 p-3 font-bold">Description</div>
      </li>
      {isFetching && (
        <li className="flex">
          <div className="basis-full p-3 text-center">Loading...</div>
        </li>
      )}
      {noData && (
        <li className="flex">
          <div className="basis-full p-3 text-center">No data</div>
        </li>
      )}
      {hasItems && items?.map((item) => <ItemsListItem key={item.id} item={item} />)}
    </ul>
  );
};
