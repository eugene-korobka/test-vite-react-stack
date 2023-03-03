import type { ItemType } from 'sharedTypes/item.types';

import { RemoveItemButtonWidget } from 'pages/ItemsList/RemoveItemButtonWidget/RemoveItemButtonWidget';

const ItemsListItem = ({ item }: { item: ItemType }) => {
  return (
    <li className="flex border-b border-solid border-gray-700 last:border-none">
      <div className="basis-4/12 p-3">{item.title}</div>
      <div className="basis-7/12 p-3">{item.description}</div>
      <div className="basis-1/12 p-3">
        <RemoveItemButtonWidget itemId={item.id} />
      </div>
    </li>
  );
};

interface ItemListProps {
  items: ItemType[];
  isLoading?: boolean;
}

const useItemsListState = (props: ItemListProps) => {
  const { isLoading, items } = props;

  const noData = !isLoading && !items?.length;
  const hasItems = !noData;

  return {
    isLoading,
    noData,
    hasItems,
    items,
  };
};

export function ItemsList(props: ItemListProps) {
  const { isLoading, noData, hasItems, items } = useItemsListState(props);

  return (
    <ul className="w-full">
      <li className="flex border-b-2 border-solid border-black">
        <div className="basis-4/12 p-3 font-bold">Title</div>
        <div className="basis-7/12 p-3 font-bold">Description</div>
        <div className="basis-1/12 p-3 font-bold">&nbsp;</div>
      </li>
      {isLoading && (
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
}
