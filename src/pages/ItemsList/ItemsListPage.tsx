import { FilteredItemsListWidget } from 'pages/ItemsList/FilteredItemsListWidget/FilteredItemsListWidget';

import { PageContainer } from 'components/PageContainer';
import { PageHeader } from 'components/PageHeader';

export const ItemsListPage = () => {
  return (
    <PageContainer>
      <PageHeader>Items List Page</PageHeader>
      <FilteredItemsListWidget />
    </PageContainer>
  );
};
