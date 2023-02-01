import { FilteredItemsListWidget } from 'pages/ItemsList/FilteredItemsListWidget/FilteredItemsListWidget';

export const ItemsListPage = () => {
  return (
    <div className="w-full">
      <h2 className="mb-4 text-xl">Items List Page</h2>
      <FilteredItemsListWidget />
    </div>
  );
};
