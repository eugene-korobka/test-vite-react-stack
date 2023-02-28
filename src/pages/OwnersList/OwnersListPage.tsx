import { PageContainer } from 'components/PageContainer';
import { PageHeader } from 'components/PageHeader';

import { OwnersListWidget } from './OwnersListWidget/OwnersListWidget';

export const OwnersListPage = () => {
  return (
    <PageContainer>
      <PageHeader>Owners List Page</PageHeader>
      <OwnersListWidget />
    </PageContainer>
  );
};
