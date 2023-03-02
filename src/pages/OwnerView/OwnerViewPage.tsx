import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSubscribeToAppEvent } from 'hooks/useAppEvents';
import { appEventOwnerRemoved } from 'sharedTypes/event.types';
import { AppRoutes } from 'src/routes';
import { RemoveOwnerWithEvent } from 'widgets/RemoveOwnerWithEvent.widget';

import { PageContainer } from 'components/PageContainer';
import { PageHeader } from 'components/PageHeader';

import { EditOwnerViewWidget } from './widgets/EditOwnerViewWidget';
import { OwnerViewWidget } from './widgets/OwnerViewWidget';

export const OwnerViewPage = () => {
  const navigate = useNavigate();

  const onRemoveItem = useCallback(() => {
    navigate(AppRoutes.ownersList());
  }, [navigate]);

  useSubscribeToAppEvent(appEventOwnerRemoved, onRemoveItem);

  return (
    <PageContainer>
      <PageHeader>Owner View Page</PageHeader>
      <div className="mb-4 flex gap-4 justify-between items-center">
        <Link to={AppRoutes.ownersList()} className="mr-auto text-blue-400">
          &lt; Back to Owners
        </Link>
        <EditOwnerViewWidget />
        <RemoveOwnerWithEvent />
      </div>
      <OwnerViewWidget />
    </PageContainer>
  );
};
