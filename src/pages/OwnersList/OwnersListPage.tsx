import { PageContainer } from 'components/PageContainer';
import { PageHeader } from 'components/PageHeader';

import { CreateOwnerWidget } from './CreateOwnerWidget/CreateOwnerWidget';
import { OwnersListWidget } from './OwnersListWidget/OwnersListWidget';

export const OwnersListPage = () => {
  return (
    <PageContainer>
      <PageHeader>Owners List Page</PageHeader>
      <div className='text-end'>
        <CreateOwnerWidget />
      </div>
      <OwnersListWidget />
    </PageContainer>
  );
};
