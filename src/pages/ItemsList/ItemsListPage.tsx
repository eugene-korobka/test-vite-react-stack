import { FilteredItemsListWidget } from 'pages/ItemsList/FilteredItemsListWidget/FilteredItemsListWidget';

import { PageContainer } from 'components/PageContainer';
import { PageHeader } from 'components/PageHeader';

import { CreateItemWidgetV2 } from './CreateItemWidget/CreateItemWidgetV2';
import { ItemsListTitleFilter } from './FilteredItemsListWidget/components/ItemsListTitleFilter';

export const ItemsListPage = () => {
  return (
    <PageContainer>
      <PageHeader>Items List Page</PageHeader>
      <div className="flex justify-between items-center mb-4">
        <ItemsListTitleFilter />
        <CreateItemWidgetV2 />
      </div>
      <FilteredItemsListWidget />
    </PageContainer>
  );
};
