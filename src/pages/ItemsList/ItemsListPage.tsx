import { FilteredItemsListWidget } from 'pages/ItemsList/FilteredItemsListWidget/FilteredItemsListWidget';

import { PageContainer } from 'components/PageContainer';
import { PageHeader } from 'components/PageHeader';

import { CreateItemWidgetHookForm } from './CreateItemWidget/CreateItemWidgetHookForm';
import { ItemsListTitleFilter } from './FilteredItemsListWidget/components/ItemsListTitleFilter';

export const ItemsListPage = () => {
  return (
    <PageContainer>
      <PageHeader>Items List Page</PageHeader>
      <div className="flex justify-between items-center mb-4">
        <ItemsListTitleFilter />
        <CreateItemWidgetHookForm />
      </div>
      <FilteredItemsListWidget />
    </PageContainer>
  );
};
