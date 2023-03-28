import { PageContainer } from 'components/PageContainer';
import { PageHeader } from 'components/PageHeader';

import { CreateOwnerWidgetHookForm } from './CreateOwnerWidget/CreateOwnerWidgetHookForm';
import { OwnersTableWidget } from './OwnersTableWidget/OwnersTableWidget';

export const OwnersListPage = () => {
  return (
    <PageContainer>
      <PageHeader>Owners List Page</PageHeader>
      <div className="text-end">
        <CreateOwnerWidgetHookForm />
      </div>
      <OwnersTableWidget />
    </PageContainer>
  );
};
