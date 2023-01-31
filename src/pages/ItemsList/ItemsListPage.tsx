import { ItemsListFilterWidget } from 'pages/ItemsList/ItemsListFilterWidget/ItemsListFilterWidget';
import { ItemsListWidget } from 'pages/ItemsList/ItemsListWidget/ItemsListWidget';

export const ItemsListPage = () => {
  return (
    <div className="w-full">
      <h2 className="mb-4 text-xl">Items List Page</h2>
      <ItemsListFilterWidget />
      <ItemsListWidget />
    </div>
  );
};
