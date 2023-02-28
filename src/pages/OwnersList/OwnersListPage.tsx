import { PageContainer } from 'components/PageContainer';

import { OwnersListWidget } from './OwnersListWidget/OwnersListWidget';

export const OwnersListPage = () => {
  return (
    <PageContainer>
      <h2 className="mb-4 text-xl">Owners List Page</h2>
      <OwnersListWidget />
    </PageContainer>
  );
};
